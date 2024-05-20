import django
django.setup()

from .models import Refine
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework.test import APITestCase

class RefineListViewsTests(APITestCase):
    """
    This is the tests for the refine list view
    """
    def setUp(self):
        User.objects.create_user(username='Tester1', password='Tester1')
        Refine.objects.all().delete() # This will make sure the database for this user is clean before running tests

    def test_logged_out_no_create_refine(self):
        """
        When a user who is not logged on makes
        a HTTP post request, a 400 error 
        message should be returned.
        """
        response = self.client.post(
            '/refine/', {"name": "a name", "reason": "reason"}
        )
        print(response.data)
        print(response.content)
        count = Refine.objects.count()
        self.assertEqual(count, 0)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_logged_out_no_view_refine_list(self):
        """
        When a user who is not logged on makes
        a HTTP get request, a 400 error 
        message should be returned
        """
        response = self.client.get('/refine/')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_logged_in_can_create_refine(self):
        """
        when a user is logged in and makes
        a post request with 'name' and 'reason', 
        a 201  should be retunred and the object
        created
        """
        self.client.login(username='Tester1', password='Tester1')
        response = self.client.post(
            '/refine/', {"name": "a name", "reason": "reason"})
        print(response.data)
        print(response.content)
        count = Refine.objects.count()
        self.assertEqual(count, 1)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_refine_no_name_display_error(self):
        """
        When a user sends out a post request
        without submitting a name attached a
        400 error should display.
        """
        self.client.login(username='Tester1', password='Tester1')
        response = self.client.post('/refine/', {"reason": "reason"})
        count = Refine.objects.count()
        self.assertEqual(count, 0)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_refine_view_own_refine_only(self):
        """
        When a user sends out a get request, they should only
        receive their own created refine objects.
        """
        SecondTester = User.objects.create_user(
            username='Tester2', password='Tester2')  # Fixed typo here
        Refine.objects.create(
            owner=SecondTester, name='tester 2 refine object', 
            reason='Testing purposes only'
        )
        self.client.login(username='Tester1', password='Tester1')
        self.client.post('/refine/', {"name": "a name", "reason": "reason"})
        response = self.client.get('/refine/')
        print(response.content_type)
        count = response.json()['count']  # Use .json() method to get data
        results = response.json()['results']
        refineOwner = results[0]['owner']
        self.assertEqual(count, 1)
        self.assertEqual(refineOwner, 'Tester1')
        self.assertEqual(response.status_code, status.HTTP_200_OK)



