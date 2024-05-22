import django
django.setup()

from django.contrib.auth.models import User
from .models import UserGoals
from refine.models import Refine
from rest_framework import status
from rest_framework.test import APITestCase

class UserGoalListViewTests(APITestCase):
    """
    This is the test for the
    user goal list view
    """
    def setUp(self):
        """
        This will create two users,
        both will have a refine object
        and only the second user will 
        have one object.
        """
        first_tester = User.objects.create_user(
            username='Tester1', password='Tester1'
        )
        Refine.objects.create(
            owner=first_tester, 
            name="Tester1 refine object", 
            reason="No goals for this user should be displayed"
        )
        second_tester = User.objects.create_user(
            username='Tester2', password='Tester2'
        )
        second_tester_refine = Refine.objects.create(
            owner=second_tester, 
            name="Tester2 refine object", 
            reason="goals testing"
        )
        UserGoals.object.create(
            owner=second_tester,
            goal_title ='Tester2 created goal',
            refine=second_tester_refine
        )
