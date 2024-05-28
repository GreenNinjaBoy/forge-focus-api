from forge_focus.permissions import OwnerOnly
from .serializers import RefineSerializer
from .models import Refine
from rest_framework import generics, permissions


class RefineList(generics.ListCreateAPIView):
    """
     This view will return a list of refined area for the
     logged in user, will also a new area for refinement.
    """
    serializer_class = RefineSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        """
        This will add the owner data to the refine object
        before it is saved.
        """
        serializer.save(owner=self.request.user)

    def get_queryset(self):
        """
        This will pull all the refine instances that are only linked
        to the current user. Within this order will be rank first 
        (with null last), and then created_at.
        """
        if self.request.user.is_authenticated:
            return self.request.user.refine.all().order_by('priority', 'created_at')
        else:
            return Refine.objects.none() 

class RefineDetails(generics.RetrieveUpdateDestroyAPIView):
    """
    This view will return a specific refine where 
    pk will be the ID of the refine.
    """
    serializer_class = RefineSerializer
    permission_classes = [OwnerOnly]
    queryset = Refine.objects.all()
