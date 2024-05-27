from django.db import models
from django.contrib.auth.models import User

tag_color_choices = [
    ("blue", "Blue"),
    ("green", "Green"),
    ("red", "Red"),
    ("yellow", "Yellow"),
    ("orange", "Orange"),
]

class Tags(model.Model):
    """
    This is the tags model
    """
    owner = model.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="tags")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    name = models.Charfield(max_lenght=20)
    color = models.CharField(choices=tag_color_choices, max_length=20)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.id} {self.title}'
