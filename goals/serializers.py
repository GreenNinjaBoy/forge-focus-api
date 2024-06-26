from django.utils import timezone
from .models import UserGoals
from rest_framework import serializers

class UserGoalsSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    is_owner = serializers.SerializerMethodField()
    time_remaining = serializers.SerializerMethodField()
    achieve_by_near = serializers.SerializerMethodField()

    def get_is_owner(self, obj):
        request = self.context.get('request')
        if request and hasattr(request, 'user'):
            return request.user == obj.owner
        return False

    def get_time_remaining(self, obj):
        future_deadline = obj.achieve_by
        if future_deadline:
            today_aware = timezone.now()
            days_remaining = (future_deadline - today_aware).days
            return days_remaining
        return None

    def get_achieve_by_near(self, obj):
        days_remaining = self.get_time_remaining(obj)
        return days_remaining is not None and days_remaining <= 7

    class Meta:
        model = UserGoals
        fields = [
            'id', 'owner', 'is_owner', 'refine', 'children', 'parent',
            'created_at', 'updated_at', 'active', 'achieve_by', 'goal_title',
            'goal_details', 'criteria', 'achieve_by_near', 'time_remaining',
        ]