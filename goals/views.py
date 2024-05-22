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



