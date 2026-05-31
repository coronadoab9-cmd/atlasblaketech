from app.data.mock_data import DISPATCH_LOADS, DISPATCH_STATS


def get_dispatch_stats_data():
    return DISPATCH_STATS


def get_dispatch_loads_data(
    status: str | None = None,
    truck_number: str | None = None,
):
    loads = DISPATCH_LOADS

    if status:
        loads = [
            load for load in loads
            if load["status"].lower() == status.lower()
        ]

    if truck_number:
        loads = [
            load for load in loads
            if load["truck_number"].lower() == truck_number.lower()
        ]

    return loads