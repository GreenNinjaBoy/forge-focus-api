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
        UserGoals.objects.all().delete()
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
        UserGoals.objects.create(
            owner=second_tester,
            goal_title ='Tester2 created goal',
            refine=second_tester_refine
        )
    
    def test_logged_out_create_goal_denied(self):
        """
        A user who is not logged in attempts a
        post request should be returned with an 
        403 error message
        """
        response = self.client.post(
            '/goals/', {"goal_title": "title", "refine": Refine.id}
        )
        count = UserGoals.objects.count()
        self.assertEqual(count, 1)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_logged_in_create_goal_granted(self):
        """
        A user who is logged in attempts a post
        request should be returned with an 201
        message and goal created
        """
        self.client.login(username="Teater1", password="Tester1")
        response = self.client.post(
            '/goals/', {"goals_title": "Tester1 Goal Title", "refine": Refine.id}
        )
        count = UserGoals.objects.count()
        self.assertEqual(count, 2)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_goal_create_no_title_display_error(self):
        """
        When a logged in user attempts a post
        request without inserting the name data
        should return a 400 error
        """
        self.client.login(username='Tester1', password='Tester1')
        response = self.client.post(
            '/goals/', {"refine": 1}
        )
        count = UserGoals.objects.count()
        self.assertEqual(count, 1)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_no_goal_view_logged_out(self):
        """
        when a user who is not logged in 
        sends an HTTP request, should recieve
        403 FORBIDDEN message
        """
        response = self.client.get('/goals/')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)    