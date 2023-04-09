import pytest

from django.contrib.auth.models import User


@pytest.fixture()
def user_0(db):
    return User.objects.create_user('testuser')


@pytest.mark.django_db
def test_set_check_password(user_0):
    user_0.set_password('password')
    assert user_0.check_password('password') is True
