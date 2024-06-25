from django.db import models
from refine.models import Refine
from django.contrib.auth.models import User


class UserGoals(models.Model):
    """
    This is the main UserGoals model
    which will store the users created
    goal objects
    """

    owner = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="usergoals")
    refine = models.ForeignKey(
        Refine,
        on_delete=models.CASCADE,
        related_name="goals_for_refine")
    children  = models.BooleanField(default=False)
    parent = models.ForeignKey(
        'self',
        on_delete=models.CASCADE,
        blank=True,
        null=True,
        related_name='nested_usergoals')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    active = models.BooleanField(default=True)
    achieve_by = models.DateField(null=True, blank=True)
    goal_title = models.CharField(max_length=50)
    goal_details = models.CharField(max_length=150, blank=True, null=True)
    value = models.CharField(max_length=150, blank=True, null=True)
    criteria = models.CharField( max_length=150, blank=True, null=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.id} {self.goal_title}'

