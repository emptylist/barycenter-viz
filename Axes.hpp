#ifndef __BARY_AXES_H__
#define __BARY_AXES_H__

#include <SFML/Graphics.hpp>
#include <vector>
#include "Edge.hpp"

class Axes {
private:
  sf::RenderWindow * window;
  std::vector<Edge *> edges;
  Axes();

public:
  Axes(sf::RenderWindow);
  ~Axes();
  void transform(sf::Vector3f);
  void draw();
};

#endif
