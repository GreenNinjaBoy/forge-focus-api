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

    def test_logged_out_no_create_refine(self):
        """
        When a user who is not logged on makes
        a HTTP post request, a 403 error 
        message should be returned.
        """
        response = self.client.post(
            '/refine/', {"name": "a name", "reason": "reason"}
        )
        count = Refine.objects.count()
        self.assertEqual(count, 0)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_logged_out_no_view_refine_list():
        """
        When a user who is not looed in makes
        a HTTP get request, a 403 error 
        message  should be returned
        """
        response = self.client.get('/refine/')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_logged_in_can_create_refine(self):
        """
        when a user is logged in and makes
        a post request with 'name' and 'reason', 
        a 201  should be retunred asnd the object
        created
        """
        self.client.login(username='Tester1', password='Tester1')
        response = self.client.post(
            '/refine/', {"name": "a name", "reason": "reason"})
        count = Focus.objects.count()
        self.assertEqual(count, 1)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)



