import django
django.setup()

from django.contrib.auth.models import User
from .models import Assignments
from goals.models import UserGoals
from refine.models import Refine
from rest_framework import status
from django.test import TransactionTestCase
from rest_framework.test import APITestCase

class AssignmentListViewTests(APITestCase):
    """
    This is the test for the list view
    """
    def setUp(self):
        """
        This will create two users and 
        each user will have the following
        1. One Refine
        2. One Goal
        3. Three assignments
            - one miscellaneous, 
            - one refine day to day
            - one usergoal steps
        """
        first_tester = User.objects.create_user(
        username='Tester1',
        password='Tester1',
        )
        first_tester_refine = Refine.objects.create(
        owner=first_tester,
        name="Tester 1 Refine name",
        reason="Test Refine"
        )
        first_tester_goal = UserGoals.objects.create(
        owner=first_tester,
        goal_title='Tester1 Goal',
        refine=first_tester_refine,
        active=True
        )
        Assignments.objects.create(
            owner=first_tester,
            name='First refine today',
            Refine=first_tester_refine,
            today=True,
            achieved=True
        )
        Assignments.objects.create(
            owner=first_tester,
            name='Tester1 first refine',
            Refine=first_tester_refine,
            today=True
        )
        Assignments.objects.create(
            owner=first_tester,
            usergoals=first_tester_goal,
            name='Tester1 first active goal, backlog only',
            Refine=first_tester_refine
        )
        second_tester = User.objects.create_user(
            username='Tester2',
            password='Tester2',
        )
        second_tester_refine = Refine.objects.create(
            owner=second_tester,
            name="Tester 2 Refine name",
            reason="Test Refine"
        )
        second_tester_goal = UserGoals.objects.create(
            owner=second_tester,
            goal_title='Tester2 Goal',
            refine=second_tester_refine,
            active=True
        )
        Assignments.objects.create(
            owner=second_tester,
            name='Second refine today',
            Refine=second_tester_refine,
            today=True,
            achieved=True
        )
        Assignments.objects.create(
            owner=second_tester,
            name='Tester2 first refine',
            Refine=second_tester_refine,
            today=True
        )
        Assignments.objects.create(
            owner=second_tester,
            usergoals=second_tester_goal,
            name='Tester2 first active goal, backlog only',
            Refine=second_tester_refine
        )

    def tearDown(self):
        User.objects.filter(username__startswith='Tester1').delete()
        User.objects.filter(username__startswith='Tester2').delete()

    def test_logged_out_create_assignment_no(self):
        """
        When a user is not logged in and is
        attempting to make a HTTP post request
        They should be returned with a 403 erro
        """
        response = self.client.post(
            '/assignment/', {"name": "Test Title"}
        )
        count = Assignments.objects.count()
        self.assertEqual(count, 6)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
    
