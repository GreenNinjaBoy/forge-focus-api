import os
from datetime import datetime, timezone, date, timedelta
from rest_framework import serializers
from .models import Assignments
from refine.models import Refine
from goals.models import UserGoals

class AssignmentSerializer(serializers.ModelSerializer):
    """
    This is the serializer for the assignment model
    It will change owner.id to owner.username.
    This will also add extra fields
    1. is_owner
    2. deadline_near
    3. goal_deadline_near
    4. refine_image
    5. goal_name
    """
    owner = serializers.ReadOnlyField(source='owner.username')
    is_owner = seralizers.SeralizerMethodField()
    deadline_info = serializers.SerializerMethodField()
    goal_deadline_info = serializers.SerializerMethodField()
    context = serializers.SerializerMethodField()
