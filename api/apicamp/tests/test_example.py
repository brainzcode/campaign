import pytest


# @pytest.mark.slow
# def inc(x):
#     print('test successful')
#     return x + 1


# @pytest.mark.slow
# def test_answer():
#     assert inc(4) == 5


# class Fruit:
#     def __init__(self, name):
#         self.name = name

#     def __eq__(self, other):
#         return self.name == other.name


# @pytest.fixture
# def my_fruit():
#     return Fruit("apple")


# @pytest.fixture
# def fruit_basket(my_fruit):
#     return [Fruit("banana"), my_fruit]


# def test_my_fruit_in_basket(my_fruit, fruit_basket):
#     assert my_fruit in fruit_basket


# def add_numbers(x, y):
#     return x + y


# @pytest.fixture(scope='session')
# def add_numbers_data():
#     print('Fixture')
#     x = 3
#     y = 3
#     expected_result = 5

#     return (x, y, expected_result)


# def test_add_numbers(add_numbers_data):
#     print('Test-Number-1')
#     x, y, expected_result = add_numbers_data

#     result = add_numbers(x, y)

#     assert result != expected_result


# def test_add_numbers2(add_numbers_data):
#     print('Test-Number-2')
#     x, y, expected_result = add_numbers_data

#     result = add_numbers(x, y)

#     assert result != expected_result
