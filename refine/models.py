from django.db import models
from django.contrib.auth.models import User

class Refine(models.Model):
    """
    This is the main refine model which will store the users chosen areas
    of their life that they wish to "refine"
    """
    owner = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="focus")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    name = models.CharField(max_lenght=50)
    rank = models.IntegerField(blank=True, null=True)
    reason = models.TextField(blank=True, null=True)
    image = models.ImageField(
        upload_to='images/', default='../default-designer_cae82s', blank=True
    )


    class Meta:
        ordering =  ['-created_at']

    def __str__(self):
        return f'{self.id} {self.name}'
