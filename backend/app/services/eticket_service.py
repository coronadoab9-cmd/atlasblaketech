from app.data.mock_data import TICKETS


def get_etickets_data(status: str | None = None, truck_number: str | None = None):
    tickets = TICKETS

    if status:
        tickets = [
            ticket for ticket in tickets
            if ticket["status"].lower() == status.lower()
        ]

    if truck_number:
        tickets = [
            ticket for ticket in tickets
            if ticket["truck_number"].lower() == truck_number.lower()
        ]

    return tickets


def get_eticket_by_token_data(token: str):
    return next((ticket for ticket in TICKETS if ticket["token"] == token), None)