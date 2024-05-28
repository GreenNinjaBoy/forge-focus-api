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

