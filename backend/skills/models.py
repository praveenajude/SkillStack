from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator


class Skill(models.Model):
    RESOURCE_TYPES = [
        ('video', 'Video'),
        ('course', 'Course'),
        ('article', 'Article'),
        ('certification', 'Certification'),
    ]
    
    PLATFORMS = [
        ('udemy', 'Udemy'),
        ('youtube', 'YouTube'),
        ('coursera', 'Coursera'),
        ('edx', 'edX'),
        ('khan_academy', 'Khan Academy'),
        ('freecodecamp', 'FreeCodeCamp'),
        ('other', 'Other'),
    ]
    
    STATUS_CHOICES = [
        ('not_started', 'Not Started'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
    ]
    
    DIFFICULTY_CHOICES = [
        (1, 'Beginner'),
        (2, 'Easy'),
        (3, 'Medium'),
        (4, 'Hard'),
        (5, 'Expert'),
    ]
    
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    color = models.CharField(max_length=7, default='#8B5CF6')  # Default purple color
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='not_started')
    difficulty = models.IntegerField(choices=DIFFICULTY_CHOICES, default=1)
    hours_spent = models.DecimalField(max_digits=5, decimal_places=2, default=0.00)
    notes = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.name
    
    @property
    def progress_percentage(self):
        """Calculate progress percentage based on completed resources"""
        total_resources = self.resources.count()
        if total_resources == 0:
            return 0
        completed_resources = self.resources.filter(status='completed').count()
        return round((completed_resources / total_resources) * 100, 1)
    
    @property
    def resources_count(self):
        return self.resources.count()
    
    @property
    def completed_resources_count(self):
        return self.resources.filter(status='completed').count()


class Resource(models.Model):
    RESOURCE_TYPES = [
        ('video', 'Video'),
        ('course', 'Course'),
        ('article', 'Article'),
        ('certification', 'Certification'),
    ]
    
    PLATFORMS = [
        ('udemy', 'Udemy'),
        ('youtube', 'YouTube'),
        ('coursera', 'Coursera'),
        ('edx', 'edX'),
        ('khan_academy', 'Khan Academy'),
        ('freecodecamp', 'FreeCodeCamp'),
        ('other', 'Other'),
    ]
    
    STATUS_CHOICES = [
        ('not_started', 'Not Started'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
    ]
    
    skill = models.ForeignKey(Skill, on_delete=models.CASCADE, related_name='resources')
    title = models.CharField(max_length=300)
    resource_type = models.CharField(max_length=20, choices=RESOURCE_TYPES)
    platform = models.CharField(max_length=20, choices=PLATFORMS)
    link = models.URLField(blank=True, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='not_started')
    hours_spent = models.DecimalField(max_digits=5, decimal_places=2, default=0.00)
    notes = models.TextField(blank=True, null=True)
    due_date = models.DateField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.title} - {self.skill.name}"


class Certification(models.Model):
    PLATFORMS = [
        ('coursera', 'Coursera'),
        ('udemy', 'Udemy'),
        ('edx', 'edX'),
        ('google', 'Google'),
        ('microsoft', 'Microsoft'),
        ('aws', 'AWS'),
        ('ibm', 'IBM'),
        ('oracle', 'Oracle'),
        ('cisco', 'Cisco'),
        ('comptia', 'CompTIA'),
        ('other', 'Other'),
    ]
    
    name = models.CharField(max_length=200)
    provided_by = models.CharField(max_length=100, blank=True, null=True)  # e.g., Google, Microsoft, AWS
    platform = models.CharField(max_length=20, choices=PLATFORMS, blank=True, null=True)
    certification_url = models.URLField(blank=True, null=True)
    notes = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.name} - {self.provided_by}"