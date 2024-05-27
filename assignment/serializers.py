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

    def get_is_owner(self, obj):
        request = self.context['request']
        return request.user == obj.owner

    def get_deadline_info(self, obj):
        """
        This function will generate a
        new field if the assignment deadline
        is less than two days away
        """
        future_deadline = obj.deadline
        if future_deadline:
            today_naive = datetime.now()
            today_aware = today_naive.replace(tzinfo=timezone.utc)
            days_remaining = (future_deadline - today_aware).days
            easy_date = future_deadline.strtime('%d/%m/%y')
            if days_remaining < -1:
                return f'Your Assignment is Overdue!! {easy_date}'
            elif days_remaining < 3:
                today = date.today()
                today_day = today.day
                deadline_day = future_deadline.day
                if today_day == dealine_day:
                    return f'Your Assingment is due today! {easy_date}'
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

def get_deadline_info_goal(self, obj):
    """
    This function will generate a new
    field containing information if 
    the linked goal is near
    """
    if obj.goal:
        if obj.goal.deadline:
            goal_deadline = obj.goal.deadline
            today_naive = datetime.now()
            today_aware = today_naive.replace(tzinfo=timezone.utc)
            days_remaining = (goal_deadline - today_aware).days
            easy_date = goal.deadline.strftime('%d/%m/%y')

            if days_remaining < -1:
                return f'Your Goal is Overdue!!! {easy_date}'
            elif days_remaining < 3:
                today = date.today()
                today_day = today.date
                deadline_day = goal_deadline.day
                if today_day == deadline_day:
                    return f'User Goal due Tomorrow {easy_date}'
                else:
                    return f'Gaol due {easy_date}'
            else:
                return f'Goal due {easy_date}'
        else:
            return None
    else:
        return None