from django.contrib import admin
from .models import Skill, Resource, Certification


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ['name', 'status', 'difficulty', 'progress_percentage', 'created_at']
    list_filter = ['status', 'difficulty', 'created_at']
    search_fields = ['name', 'description']


@admin.register(Resource)
class ResourceAdmin(admin.ModelAdmin):
    list_display = ['title', 'skill', 'resource_type', 'platform', 'status', 'created_at']
    list_filter = ['resource_type', 'platform', 'status', 'created_at']
    search_fields = ['title', 'skill__name']


@admin.register(Certification)
class CertificationAdmin(admin.ModelAdmin):
    list_display = ['name', 'provided_by', 'platform', 'created_at']
    list_filter = ['platform', 'provided_by', 'created_at']
    search_fields = ['name', 'provided_by', 'notes']