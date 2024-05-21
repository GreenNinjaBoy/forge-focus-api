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
        future_deadline = obj.deadline
        if future_deadline:
            today_naive = datetime.now()
            today_aware = today_naive.replace(tzinfo=timezone.utc)
            return (future_deadline - today_aware).total_seconds()
        else:
            return None
            
    def get_deadline_near(self, obj):
        """
        This will generate two new fields
        for the user if their deadline time is 
        between 50%-25% and below 25%
        """
        time_remaining = self.get_time_remaining(obj)
        deadline_near_mid = False
        deadline_near_low = False

        if time_remaining is not None:
            total_time = (obj.deadline - obj.created_at).total_seconds()
            proportion_remaining = time_remaining / total_time

            if 0.50 <= proportion_remaining <= 0.25:
                deadline_near_mid = True
            if proportion_remaining < 0.25:
                deadline_near_low = True

        return {
            'deadline_near_mid': deadline_near_mid,
            'deadline_near_low': deadline_near_low,
        }

    class Meta :
        model = UserGoals
        fields = [
            'id',
            'owner',
            'is_owner',
            'refine',
            'children',
            'parent',
            'created_at',
            'updated_at',
            'active',
            'achieve_by',
            'goal_title',
            'goal_details',
            'criteria',
            'deadline_near',
            'deadline_near_mid',
            'deadline_near_low',
            'time_remaining'
        ]