from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Count, Sum, Avg, Q
from .models import Skill, Resource, Certification
from .serializers import (
    SkillSerializer, SkillCreateSerializer, 
    ResourceSerializer, ResourceCreateSerializer, ResourceUpdateSerializer,
    CertificationSerializer, CertificationCreateSerializer
)


class SkillViewSet(viewsets.ModelViewSet):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer
    
    def get_serializer_class(self):
        if self.action == 'create':
            return SkillCreateSerializer
        return SkillSerializer
    
    @action(detail=True, methods=['post'])
    def add_resource(self, request, pk=None):
        skill = self.get_object()
        serializer = ResourceCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(skill=skill)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['get'])
    def dashboard_stats(self, request):
        """Get dashboard statistics"""
        # Get all skills with their progress
        skills_with_progress = Skill.objects.annotate(
            total_resources=Count('resources'),
            completed_resources=Count('resources', filter=Q(resources__status='completed'))
        )
        
        # Calculate individual skill progress and overall stats
        skill_progress_data = []
        total_skills = skills_with_progress.count()
        completed_skills = 0
        active_skills = 0
        total_progress = 0
        
        for skill in skills_with_progress:
            if skill.total_resources > 0:
                progress = (skill.completed_resources / skill.total_resources) * 100
            else:
                progress = 0
            
            skill_progress_data.append({
                'name': skill.name,
                'progress': round(progress, 1),
                'color': skill.color
            })
            
            # Count skills by progress status
            if progress == 100:
                completed_skills += 1
            elif progress > 0:
                active_skills += 1
            
            total_progress += progress
        
        # Calculate overall progress
        overall_progress = total_progress / total_skills if total_skills > 0 else 0
        
        # Total resources
        total_resources = Resource.objects.count()
        completed_resources = Resource.objects.filter(status='completed').count()
        
        # Certification statistics
        total_certifications = Certification.objects.count()
        
        # Total hours spent
        total_hours = Skill.objects.aggregate(
            total=Sum('hours_spent')
        )['total'] or 0
        
        return Response({
            'total_skills': total_skills,
            'completed_skills': completed_skills,
            'active_skills': active_skills,
            'overall_progress': round(overall_progress, 1),
            'total_resources': total_resources,
            'completed_resources': completed_resources,
            'total_certifications': total_certifications,
            'total_hours': float(total_hours),
            'skill_progress': skill_progress_data
        })


class ResourceViewSet(viewsets.ModelViewSet):
    queryset = Resource.objects.all()
    serializer_class = ResourceSerializer
    
    def get_serializer_class(self):
        if self.action == 'create':
            return ResourceCreateSerializer
        elif self.action in ['update', 'partial_update']:
            return ResourceUpdateSerializer
        return ResourceSerializer


class CertificationViewSet(viewsets.ModelViewSet):
    queryset = Certification.objects.all()
    serializer_class = CertificationSerializer
    
    def get_serializer_class(self):
        if self.action == 'create':
            return CertificationCreateSerializer
        return CertificationSerializer