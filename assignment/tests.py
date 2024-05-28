import django
django.setup()

from django.contrib.auth.models import User
from .models import Assignments
from goals.models import UserGoals
from refine.models import Refine
from rest_framework import status
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
        refine=first_tester_refine,
        today=True,
        achieved=True
    )
    Assignments.objects.create(
        owner=first_tester,
        name='Tester1 first refine',
        refine=first_tester_refine,
        today=True
    )
    Assigments.objects.create(
        owner=first_tester,
        goal=first_tester_goal,
        name='Tester1 first active goal, backlog only',
        refine=first_tester_refine
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
        refine=second_tester_refine,
        today=True,
        achieved=True
    )
    Assignments.objects.create(
        owner=second_tester,
        name='Tester2 first refine',
        refine=second_tester_refine,
        today=True
    )
    Assigments.objects.create(
        owner=second_tester,
        goal=second_tester_goal,
        name='Tester2 first active goal, backlog only',
        refine=second_tester_refine
    )

    
