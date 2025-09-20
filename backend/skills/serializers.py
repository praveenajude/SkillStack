from rest_framework import serializers
from .models import Skill, Resource, Certification


class ResourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resource
        fields = [
            'id', 'title', 'resource_type', 'platform', 'link', 
            'status', 'hours_spent', 'notes', 'due_date', 
            'created_at', 'updated_at'
        ]


class SkillSerializer(serializers.ModelSerializer):
    resources = ResourceSerializer(many=True, read_only=True)
    progress_percentage = serializers.ReadOnlyField()
    resources_count = serializers.ReadOnlyField()
    completed_resources_count = serializers.ReadOnlyField()
    
    class Meta:
        model = Skill
        fields = [
            'id', 'name', 'description', 'color', 'status', 'difficulty',
            'hours_spent', 'notes', 'progress_percentage', 'resources_count',
            'completed_resources_count', 'resources', 'created_at', 'updated_at'
        ]


class SkillCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = [
            'name', 'description', 'color', 'status', 'difficulty',
            'hours_spent', 'notes'
        ]


class ResourceCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resource
        fields = [
            'title', 'resource_type', 'platform', 'link', 'status',
            'hours_spent', 'notes', 'due_date'
        ]


class ResourceUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resource
        fields = [
            'title', 'resource_type', 'platform', 'link', 'status',
            'hours_spent', 'notes', 'due_date'
        ]
        # Make all fields optional for updates
        extra_kwargs = {
            'title': {'required': False},
            'resource_type': {'required': False},
            'platform': {'required': False},
        }


class CertificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certification
        fields = [
            'id', 'name', 'provided_by', 'platform', 'certification_url', 'notes', 'created_at', 'updated_at'
        ]


class CertificationCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certification
        fields = [
            'name', 'provided_by', 'platform', 'certification_url', 'notes'
        ]