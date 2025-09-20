from rest_framework import serializers
from .models import Skill, Resource, Certification

class ResourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resource
        fields = ['id', 'title', 'url', 'resource_type', 'completed', 'created_at']

class CertificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certification
        fields = ['id', 'name', 'issuer', 'issue_date', 'expiry_date', 'credential_id', 'verification_url', 'created_at']

class SkillSerializer(serializers.ModelSerializer):
    resources = ResourceSerializer(many=True, read_only=True)
    certifications = CertificationSerializer(many=True, read_only=True)
    
    class Meta:
        model = Skill
        fields = ['id', 'name', 'description', 'current_level', 'target_level', 'category', 'created_at', 'updated_at', 'resources', 'certifications']

class SkillListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ['id', 'name', 'description', 'current_level', 'target_level', 'category', 'created_at', 'updated_at']