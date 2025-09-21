from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SkillViewSet, ResourceViewSet, CertificationViewSet

router = DefaultRouter()
router.register(r'skills', SkillViewSet)
router.register(r'resources', ResourceViewSet)
router.register(r'certifications', CertificationViewSet)

urlpatterns = [
    path('', include(router.urls)),
]