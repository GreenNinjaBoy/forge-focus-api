from .models import Assignments, Refine
from .serializers import TaskSerializer
from rest_framework import generics, filters
from forge_focus.permissions import OwnerOnly

class ListFilter(filters.BaseFilterBackend):
    """
    This is a custom filter which enables
    the user to filter the assignment list
    by:
    1. active
    2. today
    3. achieved 
    4. refine day to day
    5. goals
    """
    def filter_queryset(self, request, queryset, view):
        active = request.query_params.get('active')
        if active == 'True':
            queryset = queryset.filter(active=True)
        elif active == 'False':
            queryset = queryset.filter(active=False)
        today = request.query_params.get('today')
        if today == 'True':
            queryset = queryset.filter(today=True)
        elif today == 'False':
            queryset = queryset.filter(today=False)
        achieved = request.query_params.get('achieved')
        if achieved == 'True':
            queryset = queryset.filter(achieved=True)
        elif achieved ==  'False':
            queryset = queryset.filter(achieved=False)
        refine = request.query_params.get('refine')
        if refine:
            if refine =='None':
                queryset = queryset.filter(refine=None)
            else:
                querset = queryset.filter(refine=refine)
        goal = request.query_params.get('usergoals')
        if goal:
            if goal == 'None':
                queryset = queryset.filter(goal=None)
            else:
                queryset = queryset.filter(goal=goal)
        return queryset

class AssignmentList(generics.ListCreateAPIView):
    """
    This view will return to the logged in 
    user a list of tasks that the user has
    already created and will also allow the 
    user to create new tasks.
    """
    serializer_class = AssignmentSerializer
    filter_backends = [
        ListFilter,
        filters.OrderingFilter,
        filters.SearchFilter,
    ]

    ordering_fields = [
        'updated_at',
        'refine',
        'goal_deadline',
        'achieve_by',
        'created_at',
    ]
    search_fields = [
        'name',
        'refine_name',
        'goal_title',
    ]

    def perform_create(self, serializer):
        """
        This will add the owners data to 
        the object before it is created
        and saved
        """
        owner = self.request.user
        refine_id = self.request.data.get('refine')
        if refine_id:
            refine = Refine.objects.get(pk=refine_id)
            image = refine.image
        else:
            image = ''
        serializer.save(image=image, owner=owner)

    def get_queryset(self):
        """
        This will pull all of the assignment
        instances that are owned by the logged
        in user, within this order by deadline
        and then created_by
        """
        return sxelf.request.user.task.all().order_by(
            'deadline', 'goal_deadline')

class AssignmentDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    This view will return a specific
    assignment where the pk will
    be the id of the task
    """
    serializer_class = AssignmentSerializer
    permission_classes = [OwnerOnly]
    queryset = Assignment.object.all()