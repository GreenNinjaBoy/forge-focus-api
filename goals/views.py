from forge_focus.permissions import OwnerOnly
from rest_framework.permissions import IsAuthenticated
from .models import UserGoals
from .serializers import UserGoalsSerializer
from rest_framework import generics, filters

class FilterList(filters.BaseFilterBackend):
    """
    This is a custom filter which will 
    allow the user to filter their goals
    by refine_id
    """

    def filter_queryset(self, request, queryset, view):
        refine_id = request.query_params.get('refine_id')
        if refine_id:
            queryset = queryset.filter(refine_id=refine_id)
        return queryset

class UserGoalList(generics.ListCreateAPIView):
    """
    This view will return to a logged in user
    a list of goals that they have created 
    and also allow that user to create new 
    goals 
    """
    permission_classes = [IsAuthenticated]
    serializer_class = UserGoalsSerializer
    filter_backends = [
        FilterList
    ]

    def perform_create(self, serializer):
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
        if self.request.user.is_authenticated:
            return self.request.user.usergoals.all().order_by('achieve_by','created_at')
        else:
            return UserGoals.objects.none()

class UserGoalDetails(generics.RetrieveUpdateDestroyAPIView):
    """
    View to return a specific user goal where the
    pk will be the id of the user goal
    """
    serializer_class = UserGoalsSerializer
    permission_classes = [OwnerOnly]
    queryset = UserGoals.objects.all()

