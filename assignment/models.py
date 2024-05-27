from django.db import models
from django.contrib.auth.models import User
from refine.models import Refine
from goals.models import UserGoals
from tags.models import Tags

class Assignments(models.Model):
    """
    This is the user assignment model 
    """
    owner = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="assignments")
    Refine = models.ForeignKey(
        Refine,
        on_delete=models.CASCADE,
        related_name="assignment_for_refine",
        blank=True,
        null=True)
    usergoals = models.ForeignKey(
        UserGoals,
        on_delete= models.CASCADE,
        related_name="assignment_for_usergoals",
        blank=True,
        null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    today = models.BooleanField(default=False)
    achieved = models.BooleanField(default=False)
    name = models.CharField(max_length=100)
    achieve_by = models.DateTimeField(null=True, blank=True)
    tags = models.ManyToManyField(Tags, blank=True)
    currently_active = models.BooleanField(default=True) 

class Meta:
    ordering = ['-created_at']

def __str__(self):
    return f'{self.id} {self.name}'