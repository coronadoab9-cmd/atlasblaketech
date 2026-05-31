from app.data.mock_data import TICKETS


def get_etickets_data():
    return TICKETS


def get_eticket_by_token_data(token: str):
    return next((ticket for ticket in TICKETS if ticket["token"] == token), None)