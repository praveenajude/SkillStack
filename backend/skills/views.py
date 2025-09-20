from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Skill, Resource, Certification
from .serializers import SkillSerializer, SkillListSerializer, ResourceSerializer, CertificationSerializer

class SkillListCreateView(generics.ListCreateAPIView):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer

class SkillDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer

class ResourceListCreateView(generics.ListCreateAPIView):
    serializer_class = ResourceSerializer
    
    def get_queryset(self):
        skill_id = self.kwargs['skill_id']
        return Resource.objects.filter(skill_id=skill_id)

class ResourceDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ResourceSerializer
    
    def get_queryset(self):
        skill_id = self.kwargs['skill_id']
        return Resource.objects.filter(skill_id=skill_id)

class CertificationListCreateView(generics.ListCreateAPIView):
    serializer_class = CertificationSerializer
    
    def get_queryset(self):
        skill_id = self.kwargs['skill_id']
        return Certification.objects.filter(skill_id=skill_id)

class CertificationDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CertificationSerializer
    
    def get_queryset(self):
        skill_id = self.kwargs['skill_id']
        return Certification.objects.filter(skill_id=skill_id)

@api_view(['GET'])
def dashboard_stats(request):
    total_skills = Skill.objects.count()
    total_resources = Resource.objects.count()
    completed_resources = Resource.objects.filter(completed=True).count()
    total_certifications = Certification.objects.count()
    
    return Response({
        'total_skills': total_skills,
        'total_resources': total_resources,
        'completed_resources': completed_resources,
        'total_certifications': total_certifications,
        'completion_rate': (completed_resources / total_resources * 100) if total_resources > 0 else 0
    })