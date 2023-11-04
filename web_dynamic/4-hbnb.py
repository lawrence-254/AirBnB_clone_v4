#!/usr/bin/python3
"""Flash Web Application """
from models import storage
from models.state import State
from models.city import City
from models.amenity import Amenity
from models.place import Place
from os import environ
from flask import Flask, render_template
import uuid

app = Flask(__name__)



@app.teardown_appcontext
def close_session(error):
    """ close the current SQLAlchemy Session """
    storage.close()


@app.route('/4-hbnb/', strict_slashes=False)
def hbnb():
    """ 4-hbnb page """
    list_states = storage.all(State).values()
    list_states = sorted(list_states, key=lambda k: k.name)
    list_state_city = []

    for state in list_states:
        list_state_city.append([state, sorted(state.cities, key=lambda k: k.name)])

    amenities = storage.all(Amenity).values()
    amenities = sorted(amenities, key=lambda k: k.name)

    places = storage.all(Place).values()
    places = sorted(places, key=lambda k: k.name)
    cache_id = uuid.uuid4()

    return render_template('4-hbnb.html',
                           states=list_state_city,
                           amenities=amenities,
                           places=places,
                           cache_id=cache_id)


if __name__ == "__main__":
    """ Start Function """
    app.run(host='0.0.0.0', port=5000)