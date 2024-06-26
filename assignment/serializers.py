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
    is_owner = serializers.SerializerMethodField()
    achieve_by_info = serializers.SerializerMethodField()
    goal_achieve_by_info = serializers.SerializerMethodField()
    context = serializers.SerializerMethodField()

    def get_is_owner(self, obj):
        request = self.context['request']
        return request.user == obj.owner

    def get_achieve_by_info(self, obj):

        future_deadline = obj.deadline
        if future_deadline:
            today_aware = datetime.now(timezone.utc)
            days_remaining = (future_deadline - today_aware).days
            easy_date = future_deadline.strftime('%d/%m/%y')
            if days_remaining < -1:
                return f'Your Assignment is Overdue!! {easy_date}'
            elif days_remaining < 3:
                today = date.today()
                today_day = today.day
                deadline_day = future_deadline.day
                if today_day == deadline_day:  # Corrected typo
                    return f'Your Assignment is due today! {easy_date}'
                tomorrow = today + timedelta(days=1)
                tomorrow_day = tomorrow.day
                if deadline_day == tomorrow_day:
                    return f'Your Assignment is due tomorrow! {easy_date}'
                else:
                    return f'Assignment due {easy_date}'
            else:
                return f'Assignment due {easy_date}'
        else:
            return None

    def get_achieve_by_info_goal(self, obj):
        if obj.goal and obj.goal.achieve_by:
            goal_achieve_by = obj.goal.achieve_by
            today_aware = datetime.now(timezone.utc)
            days_remaining = (goal_achieve_by - today_aware).days
            easy_date = goal_achieve_by.strftime('%d/%m/%y')
            if days_remaining < -1:
                return f'Your Goal is Overdue!!! {easy_date}'
            elif days_remaining < 3:
                today = date.today()
                today_day = today.day
                achieve_by_day = goal_achieve_by.day
                if today_day == achieve_by_day:
                    return f'User Goal due Tomorrow {easy_date}'
                else:
                    return f'Goal due {easy_date}'
            else:
                return f'Goal due {easy_date}'
        else:
            return None

    def get_context(self, obj):
        """
        This function will generate a
        new name field containing the
        name of linked usergoal,
        1. if no goal but a refine handles 
        2. if no goal and no refine handles
        """
        if obj.goal:
            goal_id = obj.goal.id
            goal = UserGoals.objects.get(id=goal_id)
            return f'One step closer to {goal.goal_title}'
        else:
            if obj.refine:
                return f'One day at a time to refine {obj.refine.name}'
            else:
                return "A side task"

    class Meta:
        model = Assignments
        fields = [
            'id',
            'owner',
            'is_owner',
            'created_at',
            'updated_at',
            'refine',
            'usergoals',
            'today',
            'achieved',
            'name',
            'achieve_by',
            'tags',
            'currently_active',
            'achieve_by_info',
            'goal_achieve_by_info',
            'context'
            ]