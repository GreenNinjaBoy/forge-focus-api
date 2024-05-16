from forge_focus.permissions import OwnerOnly
from .serializers import RefineSerializer
from .models import Refine
from rest_framework import generics


class RefineList(generics.ListCreateAPIView):
    """
     This view will return a list of refined area for the
     logged in user, will also a new area for refinement.
    """
    serializer_class = RefineSerializer

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
        return self.request.user.focus.all().order_by('rank', 'created_at')

class RefineDetails(generics.RetrieveUpdateDestroyAPIView):
    """
    This view will return a specific refine where 
    pk will be the ID of the refine.
    """
    serializer_class = RefineSerializer
    permission_classes = [OwnerOnly]
    queryset = Refine.objects.all()
