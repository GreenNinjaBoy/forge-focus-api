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
    achieve_by_near = serializers.SerializerMethodField()
    

    def get_is_owner(self, obj):
        request = self.context['request']
        return request.user == obj.owner

    def get_time_remaining(self, obj):
        """
        This will Generate a new feild containing the
        number of days remaining until Achieve by date.
        """
        future_deadline = obj.achieve_by
        if future_deadline:
            today_naive = datetime.now()
            today_aware = today_naive.replace(tzinfo=timezone.utc)
            days_remaining = (future_deadline - today_aware).days
            return days_remaining
        else:
            return None
            
        
    def get_achieve_by_near(self, obj):
        """
        Generates a new field that is either true if the deadline is less
        than 7 days, or false if their is no deadline or the deadline is
        more than 7 days away.
        """
        days_remaining = self.get_time_remaining(obj)
        if days_remaining is not None:
            if days_remaining <= 7:
                return True
            else:
                return False
        else:
            return False

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
            'achieve_by_near',
            'time_remaining',
        ]
        
    