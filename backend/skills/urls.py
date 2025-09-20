from django.urls import path
from . import views

urlpatterns = [
    path('skills/', views.SkillListCreateView.as_view(), name='skill-list-create'),
    path('skills/<int:pk>/', views.SkillDetailView.as_view(), name='skill-detail'),
    path('skills/<int:skill_id>/resources/', views.ResourceListCreateView.as_view(), name='resource-list-create'),
    path('skills/<int:skill_id>/resources/<int:pk>/', views.ResourceDetailView.as_view(), name='resource-detail'),
    path('skills/<int:skill_id>/certifications/', views.CertificationListCreateView.as_view(), name='certification-list-create'),
    path('skills/<int:skill_id>/certifications/<int:pk>/', views.CertificationDetailView.as_view(), name='certification-detail'),
    path('dashboard/stats/', views.dashboard_stats, name='dashboard-stats'),
]