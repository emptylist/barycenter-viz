#include <SFML/Graphics.hpp>
#include <SFML/Window.hpp>
#include <cmath>

int main() {
  sf::VideoMode vm(1080, 1080, 32);
  sf::ContextSettings settings;
  settings.antialiasingLevel = 8;
  sf::RenderWindow window(vm, "Barycenter Visualization Tool", sf::Style::Default, settings);
  window.setVerticalSyncEnabled(true);
  sf::Event event;

  sf::CircleShape center(5.f);
  center.setPosition(window.getSize().x / 2, window.getSize().y / 2);
  center.setFillColor(sf::Color::Red);

  const float divergence = 3;

  sf::VertexArray a1(sf::PrimitiveType::Quads, 4);
  a1[0].position = sf::Vector2f(window.getSize().x / 3, (2 * window.getSize().y / 3) + divergence);
  a1[1].position = sf::Vector2f(window.getSize().x / 2, (window.getSize().y / 3) + divergence/2);
  a1[2].position = sf::Vector2f(window.getSize().x / 2, (window.getSize().y / 3) - divergence/2);
  a1[3].position = sf::Vector2f(window.getSize().x / 3, (2 * window.getSize().y / 3) - divergence);

  sf::VertexArray a2(sf::PrimitiveType::Quads, 4);
  a2[0].position = sf::Vector2f(window.getSize().x / 2, (window.getSize().y / 3) + divergence/2);
  a2[1].position = sf::Vector2f(2 * window.getSize().x / 3, (2 * window.getSize().y / 3) + divergence);
  a2[2].position = sf::Vector2f(2 * window.getSize().x / 3, (2 * window.getSize().y / 3) - divergence);
  a2[3].position = sf::Vector2f(window.getSize().x / 2, (window.getSize().y / 3) - divergence/2);

  sf::VertexArray a3(sf::PrimitiveType::Quads, 4);
  a3[0].position = sf::Vector2f(2 * window.getSize().x / 3, (2 * window.getSize().y / 3) + divergence);
  a3[1].position = sf::Vector2f(window.getSize().x / 3, (2 * window.getSize().y / 3) + divergence);
  a3[2].position = sf::Vector2f(window.getSize().x / 3, (2 * window.getSize().y / 3) - divergence);
  a3[3].position = sf::Vector2f(2 * window.getSize().x / 3, (2 * window.getSize().y / 3) - divergence);

  for (int i = 0; i < 4; i++) {
    a1[i].color = sf::Color(0x46, 0x82, 0xB4);
    a2[i].color = sf::Color(0x46, 0x82, 0xB4);
    a3[i].color = sf::Color(0x46, 0x82, 0xB4);
  }

  while (window.isOpen()) {
    while (window.pollEvent(event)) {
      if (event.type == sf::Event::Closed) {
	goto exit;
      }
    }
    
    window.clear(sf::Color::White);
    window.draw(center);
    window.draw(a1);
    window.draw(a2);
    window.draw(a3);
    window.display();
  }
  
 exit:
  window.close();
  return 0;
}
