 -- TEST DATA INSERTION
USE trojanbites;

-- Insert users
INSERT INTO User (user_id, password) VALUES
('Myke', 'pass123'),
('Jerry', 'jerrypass'),
('Mannat', 'mannat123'),
('Naysa', 'naysa123'),
('Ai Vy', 'aivy123'),
('Andrew', 'andrewpw'),
('Elijah', 'elijahpw'),
('Zarif', 'zarifpw');

-- Insert recipes
INSERT INTO Recipe (recipe_id, user_id, title, tags, votes, description, ingredients, instructions) VALUES
(1, 'Myke', 'Spicy Ramen', '["spicy", "noodles"]', 0, 'Hot ramen with a kick.', '{"noodles":"200g", "chili":"2 tsp", "egg":"1"}', '["Boil noodles.", "Add chili.", "Top with egg."]'),
(2, 'Jerry', 'Avocado Toast', '["vegan", "quick"]', 0, 'Simple avocado toast.', '{"bread":"2 slices", "avocado":"1"}', '["Toast bread.", "Mash avocado.", "Spread and serve."]'),
(3, 'Mannat', 'Mango Smoothie', '["drink", "fruit"]', 0, 'Refreshing mango drink.', '{"mango":"1 cup", "yogurt":"1/2 cup", "honey":"1 tsp"}', '["Blend all ingredients."]'),
(4, 'Naysa', 'Garlic Bread', '["snack", "bread"]', 0, 'Crispy garlic-flavored bread.', '{"bread":"1 loaf", "garlic":"3 cloves"}', '["Spread garlic butter and bake."]'),
(5, 'Ai Vy', 'Pho', '["vietnamese", "soup"]', 0, 'Traditional Vietnamese soup.', '{"noodles":"200g", "beef":"100g", "herbs":"mixed"}', '["Simmer broth.", "Add ingredients."]'),
(6, 'Andrew', 'Tacos', '["mexican", "dinner"]', 0, 'Classic beef tacos.', '{"taco_shells":"3", "beef":"150g", "lettuce":"some"}', '["Cook beef.", "Fill shells.", "Add toppings."]'),
(7, 'Elijah', 'Chocolate Cake', '["dessert", "baking"]', 0, 'Rich chocolate cake.', '{"flour":"2 cups", "cocoa":"1/2 cup"}', '["Mix and bake ingredients."]'),
(8, 'Zarif', 'Shakshuka', '["middle-eastern", "eggs"]', 0, 'Poached eggs in tomato sauce.', '{"eggs":"2", "tomato_sauce":"1 cup"}', '["Simmer sauce.", "Crack in eggs."]');

-- Insert votes
INSERT INTO Voting (user_id, recipe_id, timestamp) VALUES
('Jerry', 1, CURRENT_TIMESTAMP),
('Myke', 2, CURRENT_TIMESTAMP),
('Naysa', 3, CURRENT_TIMESTAMP),
('Ai Vy', 4, CURRENT_TIMESTAMP),
('Andrew', 5, CURRENT_TIMESTAMP),
('Elijah', 6, CURRENT_TIMESTAMP),
('Zarif', 7, CURRENT_TIMESTAMP),
('Mannat', 8, CURRENT_TIMESTAMP);
