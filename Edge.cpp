#include "Edge.hpp"

Edge::Edge(sf::Vector3f v0, sf::Vector3f v1, sf::RenderWindow& window):
  graphic(sf::PrimitiveType::Quads, 4),
  v0(v0),
  v1(v1),
  window(&window)
{}

void Edge::transform(sf::Vector3f camera) {

}

void Edge::draw() {
  window->draw(graphic);
}
