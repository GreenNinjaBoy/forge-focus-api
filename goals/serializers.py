from .models import UserGoals
from rest_framework import serializers
from datetime import datetime, timezone

class UserGoalsSerializer(serializers.ModelSerializer):
    """
    This is the Serializer for the UserGoals
    model. It will change owner.id into 
    owner.username and will add 3 extra 
    fields is_owner, time_remaining, deadline_near
    """
    owner = serializers.ReadOnlyField(source='owner.username')
    is_owner = serializers.SerializerMethodField()
    time_remaining = serializers.SerializerMethodField()
    deadline_near = serializers.SerializerMethodField()

    def get_is_owner(self, obj):
        request = self.context['request']
        return request.user == obj.owner

    def get_time_remaining(self, obj):
        """
        This function will generate a new field
        containing the time remaining until the 
        user reaches their deadline
        """
        future_deadline = obj.deadline
        if future_deadline:
            today_naive = datetime.now()
            today_aware = today_naive.replace(tzinfo=timezone.utc)
            time_remaining = future_deadline - today_aware
            days, seconds = time_remaining.days, time_remaining.seconds
            hours = seconds // 3600
            minutes = (seconds % 3600) // 60
            return f"{days} days, {hours} hours, {minutes} minutes"
        else:
            return None

    