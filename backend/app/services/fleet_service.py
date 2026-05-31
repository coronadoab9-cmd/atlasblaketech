from app.data.mock_data import DEVICES, DRIVERS, FLEET_STATS, TRUCKS


def get_fleet_stats_data():
    return FLEET_STATS


def get_trucks_data(status: str | None = None):
    trucks = TRUCKS

    if status:
        trucks = [
            truck for truck in trucks
            if truck["status"].lower() == status.lower()
        ]

    return trucks


def get_drivers_data(active: bool | None = None):
    drivers = DRIVERS

    if active is not None:
        drivers = [
            driver for driver in drivers
            if driver["active"] == active
        ]

    return drivers


def get_devices_data(active: bool | None = None):
    devices = DEVICES

    if active is not None:
        devices = [
            device for device in devices
            if device["active"] == active
        ]

    return devices