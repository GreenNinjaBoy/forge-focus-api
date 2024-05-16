from rest_framework import permissions

class OwnerOnly(permissions.BasePermission):
    """
    This will override the base permission and checks
    that the user is the owner of the refine object.
    If not the user is not the owner then permissions
    will be denied.
    """
    def has_object_permission(self, request, view, obj):
        return obj.owner == request.user
        