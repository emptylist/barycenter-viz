#include "Axes.hpp"
#include <cmath>

static const sf::Vector3f v0(1, 0, -1/sqrt(2));
static const sf::Vector3f v1(-1, 0, -1/sqrt(2));
static const sf::Vector3f v2(1, 0, 1/sqrt(2));
static const sf::Vector3f v3(-1, 0, 1/sqrt(2));

Axes::Axes(sf::RenderWindow& w):
  window(&w),
{
  edges.push_back(new Edge(v0, v1, window));
  edges.push_back(new Edge(v0, v2, window));
  edges.push_back(new Edge(v0, v3, window));
  edges.push_back(new Edge(v1, v2, window));
  edges.push_back(new Edge(v1, v3, window));
  edges.push_back(new Edge(v2, v3, window));
}

Axes::~Axes() {
  for (auto it = edges.begin(); it != edges.end(); it++) {
    delete[] *it;

void transform(sf::Vector3f camera) {
  for (auto it = edges.begin(); it != edges.end(); it++) {
    (*it)->transform(camera);
  }
}

void Axes::draw() {
  for (auto it = edges.begin(); it != edges.end(); it++) {
    (*it)->draw();
  }
}


