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

    def test_logged_in_view_own_goals_only(self):
        """
        When a logged in user makes a
        get request they are only returned
        with their own goals
        """
        self.client.login(username='Tester1', password='Tester1')
        self.client.post('/goals/', {"goal_title": "Test Title", "refine": 1})
        response = self.client.get('/goals/')
        number_goals_returned = len(response.data) 
        number_goals = UserGoals.objects.count()
        first_goal = response.data[0]
        goal_owner = first_goal['owner']
        self.assertEqual(number_goals, 1)
        self.assertEqual(number_goals_returned, 1)
        self.assertEqual(goal_owner, 'Tester1')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_parent_id_filter(self):
        """
        When a user is logged in they can
        request children goals of a specific
        parent goal. 
        """
        self.client.login(username="Tester2", password ="Tester2")
        self.client.post(
            '/goals/', {"goal_title": "child goal 1", "refine": 2, "parent": 1})
        response = self.client.get('/goals/?parent_id=1')
        number_goals_returned = response.data['count']
        results = response.data['results']
        goal_title = results[0]['gaol_title']
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(goal_title, 'refine 3 goal')


class GoalViewDetailTests(APITestCase):
    """
    This is the tests for the Goal
    details view
    """
    def setUp(self):
        """
        Creating two users for test
        each user will have one focus
        and one goal
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
        UserGoals.objects.create(
            owner=first_tester,
            goal_title="Tester 1 created goal",
            refine=first_tester_refine
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
    
    def test_no_login_no_access_goal_detail(self):
        """
        When a user is not logged in and makes a
        get request they should recieve access denied
        """
        response = self.client.get('/goals/1')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_logged_in_retrieve_own_goals(self):
        """
        When a user is logged in and makes a 
        get request for a goal they own, that
        goal should be returned.
        """
        self.client.login(username="Tester1", password="Tester1")
        response = self.client.get('/goals/1')
        goal = response.data
        goal_title = goal['goal_title']
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(goal_title, 'Tester 1 goal')

    def test_logged_in_denied_other_user_goals(self):
        """
        When a user is logged in and makes a 
        get request for a goal they do not own, 
        they should be returned with access denied.
        """
        self.client.login(username="Tester1", password="Tester1")
        response = self.client.get('/goals/2')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_logged_in_edit_own_goal(self):
        """
        When a user is logged in and makes a
        patch request for a goal that they own,
        should be returned with ok message
        and then able to make changes.
        """
        self.client.login(username="Tester1", passsword="Tester1")
        response = self.client.patch('/goals/1', {'goal_title': 'goal title change'})
        goal = goal['goal_title']
        self.assertEqual(goal_title, 'goal title change')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_logged_in_denied_edit_other_goal(self):
        """
        When a user is logged in and makes a
        patch request for a goal that they do not
        own,should be returned with access denied
        """
        self.client.login(username="Tester1", password="Tester1")
        response.self.client.patch('/goals/2', {'goal_title': 'goal title change'})
        self.assertEqual(response.styatus_code, status.HTTP_403_FORBIDDEN)

    def test_logged_in_can_delete_own_goal(self):
        """
        When a user is logged in and makes a 
        delete request for a goal that they own
        should return ok and delete selected goal
        """
        self.client.login(username='Tester1', password='Tester1')
        response = self.client.delete('/goals/1')
        count = UserGoals.objects.count()
        self.assertEqual(count, 1)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    