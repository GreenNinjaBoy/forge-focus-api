from forge_focus.permissions import OwnerOnly
from .models import UserGoals
from .serializers import UserGoalsSerializer
from rest_framework import generics, filters

class FilterList(filters.BaseFilterBackend):
    """
    This is a custom filter which will 
    allow the user to filter their goals
    by refine_id, no parent and parent_id
    """

    def filter_queryset(self, request, queryset, view):
        refine_id = request.query_params.get('refine_id')
        parent_id = request.query_params.get('parent_id')
        parent = request.query_params.get('parent')
        if refine_id:
            queryset = queryset.filter(refine_id=refine_id)
        if parent_id:
            queryset = queryset.filter(parent_id=parent_id)
        if parent:
            queryset = queryset.filter(parent=None)
        return queryset

class UserGoalList(generics.ListCreateAPIView):
    """
    This view will return to a logged in user
    a list of goals that they have created 
    and also allow that user to create new 
    goals 
    """
    serializer_class = UserGoalsSerializer
    filter_backends = [
        FilterList
    ]

    def create_goal(self, serializer):
        """
        This will add the owner data to
        the objectg before it is saved 
        """
        serializer.save(owner=self.request.user)

    def get_queryset(self):
        """
        Pulls all of the goal instances that are linked
        to the currently logged in user. This will be in 
        order of rank and then by created_at
        """
        return self.request.user.usergoals.all().order_by('achieve_by','created_at')



