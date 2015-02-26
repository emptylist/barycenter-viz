#ifndef __BARY_EDGE_H__
#define __BARY_EDGE_H__

#include <SFML/Graphics.hpp>

class Edge {
private:
  sf::RenderWindow * window;
  sf::VertexArray graphic;
  sf::Vector3f v0;
  sf::Vector3f v1;
  Edge();
public:
  Edge(sf::Vector3f, sf::Vector3f);
  void transform(sf::Vector3f);
  void draw();
};

#endif
