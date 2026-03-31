
export const menuData = {
    tiffins: [
        // IDLI
        { id: 't1', name: 'Idli', price: 40, category: 'tiffins', image: '/images/idli.png', prepTime: '10 min', description: 'Soft, fluffy steamed rice cakes served with chutney and sambar.' },
        { id: 't2', name: 'Ghee Idli', price: 60, category: 'tiffins', image: '/images/ghee-idli.png', prepTime: '10 min', description: 'Classic Idlis topped with aromatic pure ghee for a rich taste.' },
        { id: 't3', name: 'Karam Idli', price: 70, category: 'tiffins', image: '/images/karam-idli.jpg', prepTime: '12 min', description: 'Spicy Idlis tossed in special Guntur chilli powder and ghee.' },
        { id: 't5', name: 'Sambar Idli', price: 65, category: 'tiffins', image: '/images/sambar-idli.png', prepTime: '10 min', description: 'Soft idlis soaked in lentil-based vegetable stew.' },
        { id: 't4', name: 'Mini Idli', price: 50, category: 'tiffins', image: '/images/mini-idli.jpg', prepTime: '10 min', description: 'Bowl of bite-sized mini idlis immersed in hot, flavorful sambar.' },

        // VADA & SNACKS
        { id: 't26', name: 'Medu Vada (Garelu)', price: 50, category: 'tiffins', image: '/images/medu-vada.png', prepTime: '15 min', description: 'Crispy, donut-shaped deep-fried lentil fritters.' },
        { id: 't29', name: 'Mysore Bonda', price: 50, category: 'tiffins', image: '/images/mysore-bonda.png', prepTime: '15 min', description: 'Fluffy, round, deep-fried fritters with a soft center.' },
        { id: 't30', name: 'Punugulu', price: 40, category: 'tiffins', image: '/images/punugulu.png', prepTime: '10 min', description: 'Crunchy snack made with rice batter, served with spicy chutney.' },
        { id: 't65', name: 'Mirchi Bajji', price: 45, category: 'tiffins', image: '/images/mirchi-bajji.jpg', prepTime: '15 min', description: 'Spicy green chillies dipped in batter and deep-fried.' },

        // PURI & CHAPATHI
        { id: 't31', name: 'Poori', price: 60, category: 'tiffins', image: '/images/poori.png', prepTime: '15 min', description: 'Puffed deep-fried wheat bread served with potato masala.' },
        { id: 't32', name: 'Poori Masala', price: 70, category: 'tiffins', image: '/images/poori-masala.jpg', prepTime: '15 min', description: 'The classic combo of fluffy Poori and spicy Aloo Curry.' },
        { id: 't33', name: 'Chapathi', price: 50, category: 'tiffins', image: '/images/chapathi.jpg', prepTime: '10 min', description: 'Soft whole wheat flatbread served with kurma.' },

        // UPMA
        { id: 't22', name: 'Plain Upma', price: 40, category: 'tiffins', image: '/images/plain-upma.png', prepTime: '12 min', description: 'Savory semolina porridge cooked with vegetables and nuts.' },
        { id: 't23', name: 'Rava Upma', price: 45, category: 'tiffins', image: '/images/rava-upma-v2.png', prepTime: '12 min', description: 'Classic wheat semolina upma tempered with mustard seeds.' },
        { id: 't25', name: 'Semiya Upma', price: 50, category: 'tiffins', image: '/images/semiya-upma.png', prepTime: '15 min', description: 'Vermicelli noodles stir-fried with veggies and spices.' },

        // DOSA
        { id: 't6', name: 'Plain Dosa', price: 50, category: 'tiffins', image: '/images/plain-dosa.png', prepTime: '15 min', description: 'Crispy golden crepe made from fermented rice and lentil batter.' },
        { id: 't7', name: 'Ghee Dosa', price: 70, category: 'tiffins', image: '/images/ghee-dosa.jpg', prepTime: '15 min', description: 'Roasted to perfection with generous amounts of pure ghee.' },
        { id: 't8', name: 'Masala Dosa', price: 80, category: 'tiffins', image: '/images/masala-dosa.jpg', prepTime: '18 min', description: 'Stuffed with a savory spiced potato and onion filling.' },
        { id: 't9', name: 'Onion Dosa', price: 85, category: 'tiffins', image: '/images/onion-dosa.png', prepTime: '18 min', description: 'Topped with crunchy chopped onions and green chillies.' },
        { id: 't10', name: 'Onion Masala Dosa', price: 95, category: 'tiffins', image: '/images/onion-masala-dosa.png', prepTime: '20 min', description: 'The ultimate combo of onions and potato masala filling.' },
        { id: 't11', name: 'Butter Dosa', price: 90, category: 'tiffins', image: '/images/butter-dosa.jpg', prepTime: '15 min', description: 'Cooked with rich butter for a crispy and indulgent texture.' },
        { id: 't12', name: 'Paper Dosa', price: 100, category: 'tiffins', image: '/images/paper-dosa.png', prepTime: '15 min', description: 'Extra thin and large crispy crepe, served with chutneys.' },
        { id: 't13', name: 'Set Dosa', price: 80, category: 'tiffins', image: '/images/set-dosa.png', prepTime: '15 min', description: 'Pair of thick, soft, and spongy pancakes served with saagu.' },
        { id: 't14', name: 'Rava Dosa', price: 85, category: 'tiffins', image: '/images/rava-dosa.jpg', prepTime: '20 min', description: 'Instant semolina crepe with a crisp, netted texture.' },
        { id: 't15', name: 'Rava Onion Dosa', price: 95, category: 'tiffins', image: '/images/rava-onion-dosa.jpg', prepTime: '20 min', description: 'Crispy Rava Dosa topped with onions and spices.' },
        { id: 't16', name: 'Mysore Dosa', price: 90, category: 'tiffins', image: '/images/mysore-dosa.png', prepTime: '18 min', description: 'Spread with spicy red chutney and served crisp.' },

        // PESARATTU
        { id: 't18', name: 'Plain Pesarattu', price: 70, category: 'tiffins', image: '/images/plain-pesarattu.jpg', prepTime: '15 min', description: 'Nutritious green gram crepe, a specialty of Andhra.' },
        { id: 't19', name: 'Onion Pesarattu', price: 80, category: 'tiffins', image: '/images/onion-pesarattu.jpg', prepTime: '15 min', description: 'Pesarattu topped with onions, ginger, and cumin.' },
        { id: 't20', name: 'Upma Pesarattu', price: 90, category: 'tiffins', image: '/images/upma-pesarattu.jpg', prepTime: '20 min', description: 'The classic combination of Pesarattu stuffed with Upma.' },

        // UTTAPAM
        { id: 't35', name: 'Uttapam Plain', price: 60, category: 'tiffins', image: '/images/uttapam-plain.jpg', prepTime: '15 min', description: 'Thick, fluffy rice pancake, soft in the center.' },
        { id: 't37', name: 'Uttapam Veg', price: 85, category: 'tiffins', image: '/images/uttapam-veg.png', prepTime: '18 min', description: 'Topped with mixed vegetables like onions, tomatoes, and carrots.' },

        // SPECIALS & NON-VEG
        { id: 't17', name: 'Egg Dosa', price: 75, category: 'tiffins', image: '/images/egg-dosa.jpg', prepTime: '18 min', description: 'Dosa coated with a fluffy beaten egg and spices.' },
        { id: 't43', name: 'Omelette', price: 40, category: 'tiffins', image: '/images/omelette.png', prepTime: '10 min', description: 'Fluffy eggs whisked with onions, chillies, and spices.' },
        { id: 't45', name: 'Chicken Dosa', price: 150, category: 'tiffins', image: '/images/chicken-dosa.png', prepTime: '20 min', description: 'Crispy Dosa stuffed with spicy chicken keema masala.' },
        { id: 't50', name: 'Mutton Dosa', price: 200, category: 'tiffins', image: '/images/mutton-dosa.jpg', prepTime: '25 min', description: 'Premium Dosa filled with rich and spicy mutton curry.' },

        // BEVERAGES & EXTRAS
        { id: 't66', name: 'Peanut Chutney', price: 20, category: 'tiffins', image: '/images/peanut-chutney.jpg', prepTime: '5 min', description: 'Freshly ground peanuts, chillies, and spices.' },
        { id: 't67', name: 'Tea', price: 15, category: 'tiffins', image: '/images/tea.jpg', prepTime: '5 min', description: 'Hot and strong aromatic milk tea.' },
        { id: 't68', name: 'Bun', price: 10, category: 'tiffins', image: '/images/bun.png', prepTime: '0 min', description: 'Soft and sweet bakery bun.' },
        { id: 't69', name: 'Milk', price: 10, category: 'tiffins', image: '/images/milk.png', prepTime: '5 min', description: 'Fresh warm milk.' },
        { id: 't70', name: 'Water Bottle', price: 20, category: 'tiffins', image: '/images/water-bottle.png', prepTime: '0 min', description: 'Chilled mineral water bottle.' },
    ],
    lunch: [
        // RICE
        { id: 'l1', name: 'White Rice', price: 60, category: 'lunch', image: '/images/white-rice.png', prepTime: '10 min', description: 'Steamed premium sona masoori rice.' },
        { id: 'l3', name: 'Jeera Rice', price: 120, category: 'lunch', image: '/images/jeera-rice.jpg', prepTime: '15 min', description: 'Aromatic basmati rice tempered with cumin seeds and ghee.' },
        { id: 'l5', name: 'Curd Rice', price: 80, category: 'lunch', image: '/images/curd-rice.png', prepTime: '10 min', description: 'Creamy yogurt rice seasoned with mustard seeds and curry leaves.' },
        { id: 'l6', name: 'Lemon Rice', price: 100, category: 'lunch', image: '/images/lemon-rice.png', prepTime: '15 min', description: 'Tangy rice flavored with lemon juice, turmeric, and peanuts.' },
        { id: 'l8', name: 'Pulihora', price: 90, category: 'lunch', image: '/images/pulihora.jpg', prepTime: '15 min', description: 'Traditional tamarind rice with a perfect balance of sour and spice.' },

        // MEALS/THALI
        { id: 'l10', name: 'Sambar', price: 50, category: 'lunch', image: '/images/sambar.jpg', prepTime: '0 min', description: 'Authentic South Indian lentil and vegetable stew.' },
        { id: 'l11', name: 'Rasam', price: 40, category: 'lunch', image: '/images/rasam.jpg', prepTime: '0 min', description: 'Spicy and tangy soup, great for digestion.' },
        { id: 'l15', name: 'South Indian Meals', price: 200, category: 'lunch', image: '/images/south-indian-meals.jpg', prepTime: '0 min', description: 'Complete wholesome meal with rice, dal, curry, sambar, rasam, curd, and sweet.' },

        // CURRIES
        { id: 'l29', name: 'Chicken Curry', price: 200, category: 'lunch', image: '/images/chicken-curry.jpg', prepTime: '20 min', description: 'Tender chicken cooked in a rich and spicy onion-tomato gravy.' },
        { id: 'l30', name: 'Chicken Fry', price: 180, category: 'lunch', image: '/images/chicken-fry.jpg', prepTime: '20 min', description: 'Spicy dry roasted chicken tossed with curry leaves and spices.' },
        { id: 'l34', name: 'Mutton Curry', price: 300, category: 'lunch', image: '/images/mutton-curry.jpg', prepTime: '25 min', description: 'Succulent mutton pieces simmered in traditional spices.' },
        { id: 'l37', name: 'Fish Curry', price: 250, category: 'lunch', image: '/images/fish-curry.jpg', prepTime: '25 min', description: 'Nellore style tangy and spicy fish curry.' },
        { id: 'l41', name: 'Vegetable Kurma', price: 120, category: 'lunch', image: '/images/vegetable-kurma.jpg', prepTime: '15 min', description: 'Mixed vegetables cooked in a creamy coconut and cashew gravy.' },
        { id: 'l42', name: 'Aloo Kurma', price: 100, category: 'lunch', image: '/images/aloo-kurma.jpg', prepTime: '15 min', description: 'Potato cubes cooked in a mild and flavorful gravy.' },
        { id: 'l43', name: 'Aloo Fry', price: 100, category: 'lunch', image: '/images/aloo-fry.png', prepTime: '15 min', description: 'Simple and delicious fried potatoes with spices.' },
        { id: 'l44', name: 'Cabbage Fry', price: 80, category: 'lunch', image: '/images/cabbage-fry.png', prepTime: '15 min', description: 'Stir-fried cabbage with chana dal and mild spices.' },
        { id: 'l45', name: 'Beans Fry', price: 80, category: 'lunch', image: '/images/beans-fry.jpg', prepTime: '15 min', description: 'French beans sautéed with grated coconut and spices.' },
        { id: 'l46', name: 'Ladies Finger Fry', price: 80, category: 'lunch', image: '/images/ladies-finger-fry.png', prepTime: '15 min', description: 'Crispy fried okra with peanuts and spices.' },
        { id: 'l47', name: 'Brinjal Fry', price: 80, category: 'lunch', image: '/images/brinjal-fry.png', prepTime: '15 min', description: 'Tender brinjal pieces fried with aromatic masala.' },
        { id: 'l48', name: 'Spinach Dal', price: 100, category: 'lunch', image: '/images/spinach-dal.png', prepTime: '15 min', description: 'Healthy combination of lentils and fresh spinach leaves.' },
        { id: 'l49', name: 'Tomato Pappu', price: 90, category: 'lunch', image: '/images/tomato-pappu.png', prepTime: '15 min', description: 'Tangy lentil curry made with ripe tomatoes.' },
        { id: 'l50', name: 'Gutti Vankaya', price: 120, category: 'lunch', image: '/images/gutti-vankaya.png', prepTime: '20 min', description: 'Stuffed brinjal curry, a signature Andhra delicacy.' },

        // SNACKS
        { id: 'l40', name: 'Mirchi Bajji', price: 50, category: 'lunch', image: '/images/mirchi-bajji.jpg', prepTime: '15 min', description: 'Spicy green chillies dipped in batter and deep-fried.' },

        // SOUPS
        { id: 'l69', name: 'Chicken Soup', price: 120, category: 'lunch', image: '/images/chicken-soup.jpg', prepTime: '15 min', description: 'Warm and comforting soup made with chicken broth and herbs.' },
        { id: 'l70', name: 'Mutton Soup', price: 160, category: 'lunch', image: '/images/mutton-soup.jpg', prepTime: '20 min', description: 'Rich bone soup extracted from mutton bones and spices.' },

        // BIRYANI
        { id: 'l51', name: 'Veg Biryani', price: 180, category: 'lunch', image: '/images/veg-biryani.png', prepTime: '25 min', description: 'Basmati rice cooked with mixed vegetables and aromatic spices.' },
        { id: 'l52', name: 'Chicken Biryani', price: 250, category: 'lunch', image: '/images/chicken-biryani.jpg', prepTime: '25 min', description: 'World-famous aromatic rice dish with marinated chicken pieces.' },
        { id: 'l53', name: 'Mutton Biryani', price: 350, category: 'lunch', image: '/images/mutton-biryani.jpg', prepTime: '30 min', description: 'Rich and flavorful biryani made with tender mutton chunks.' },

        // PICKLES
        { id: 'l54', name: 'Lemon Pickle', price: 20, category: 'lunch', image: '/images/lemon-pickle.jpg', prepTime: '0 min', description: 'Spicy and tangy preserved lemons.' },
        { id: 'l55', name: 'Tomato Pickle', price: 20, category: 'lunch', image: '/images/tomato-pickle.jpg', prepTime: '0 min', description: 'Traditional Andhra style tomato pickle.' },

        // EXTRAS
        { id: 'l56', name: 'Curd', price: 20, category: 'lunch', image: '/images/curd.jpg', prepTime: '0 min', description: 'Fresh homemade yogurt.' },

        // BEVERAGES
        { id: 'l57', name: 'Tea', price: 15, category: 'lunch', image: '/images/tea.jpg', prepTime: '5 min', description: 'Hot tea.' },
        { id: 'l58', name: 'Bun', price: 10, category: 'lunch', image: '/images/bun.png', prepTime: '0 min', description: 'Sweet bun.' },
        { id: 'l59', name: 'Milk', price: 10, category: 'lunch', image: '/images/milk.png', prepTime: '5 min', description: 'Warm milk.' },
        { id: 'l63', name: 'Badam Milk', price: 20, category: 'lunch', image: '/images/badam-milk.jpg', prepTime: '0 min', description: 'Chilled almond flavored milk with nuts.' },
        { id: 'l64', name: 'Cocktail', price: 120, category: 'lunch', image: '/images/cocktail.jpg', prepTime: '10 min', description: 'Refreshing fruit cocktail.' },
        { id: 'l65', name: 'Coke', price: 40, category: 'lunch', image: '/images/coke.png', prepTime: '0 min', description: 'Chilled Coca-Cola.' },
        { id: 'l66', name: 'Sprite', price: 40, category: 'lunch', image: '/images/sprite.png', prepTime: '0 min', description: 'Chilled Sprite lemon-lime soda.' },
        { id: 'l67', name: 'Water Bottle', price: 20, category: 'lunch', image: '/images/water-bottle.png', prepTime: '0 min', description: 'Mineral water.' },
        { id: 'l68', name: 'Pepsi', price: 40, category: 'lunch', image: '/images/pepsi.png', prepTime: '0 min', description: 'Chilled Pepsi.' },

        // MANDI
        { id: 'l71', name: 'Mutton Mandi', price: 450, category: 'lunch', image: '/images/mutton-mandi.jpg', prepTime: '40 min', description: 'Arabian dish with slow-cooked mutton served over fumigated rice.' },

        // DESSERTS
        { id: 'l61', name: 'Strawberry Ice Cream', price: 60, category: 'lunch', image: '/images/strawberry-ice-cream.jpg', prepTime: '0 min', description: 'Creamy strawberry flavored ice cream.' },
        { id: 'l62', name: 'Peanut Butter Ice Cream', price: 60, category: 'lunch', image: '/images/peanut-butter-ice-cream.jpg', prepTime: '0 min', description: 'Rich ice cream with peanut butter ribbons.' },
        { id: 'l72', name: 'Lumma Ice Cream', price: 60, category: 'lunch', image: '/images/lumma-ice-cream.png', prepTime: '0 min', description: 'Special house blend ice cream.' },
        { id: 'l73', name: 'Ninja Ice Cream', price: 60, category: 'lunch', image: '/images/ninja-ice-cream.jpg', prepTime: '0 min', description: 'Dark chocolate and mint fusion.' },
        { id: 'l74', name: 'Kulfi', price: 60, category: 'lunch', image: '/images/kulfi.png', prepTime: '0 min', description: 'Traditional Indian frozen dessert on a stick.' },
        { id: 'l75', name: 'Vanilla Ice Cream', price: 60, category: 'lunch', image: '/images/vanilla-ice-cream.png', prepTime: '0 min', description: 'Classic vanilla bean ice cream.' },
        { id: 'l76', name: 'Mango Ice Cream', price: 60, category: 'lunch', image: '/images/mango-ice-cream.png', prepTime: '0 min', description: 'Made with real alphonso mango pulp.' },
    ],
    dinner: [
        // BIRYANI - Pot style
        { id: 'd1', name: 'Veg Biryani', price: 180, category: 'dinner', image: '/images/veg-biryani.png', prepTime: '25 min', description: 'Basmati rice cooked with mixed vegetables and aromatic spices.' },
        { id: 'd2', name: 'Chicken Biryani', price: 250, category: 'dinner', image: '/images/chicken-biryani.jpg', prepTime: '25 min', description: 'World-famous aromatic rice dish with marinated chicken pieces.' },
        { id: 'd3', name: 'Mutton Biryani', price: 350, category: 'dinner', image: '/images/mutton-biryani.jpg', prepTime: '30 min', description: 'Rich and flavorful biryani made with tender mutton chunks.' },

        // CURRY
        { id: 'd4', name: 'Paneer Butter Masala', price: 200, category: 'dinner', image: '/images/paneer-butter-masala.jpg', prepTime: '20 min', description: 'Paneer cubes cooked in a rich and creamy tomato-butter gravy.' },

        // FRIED RICE
        { id: 'd5', name: 'Veg Fried Rice', price: 140, category: 'dinner', image: '/images/veg-fried-rice.jpg', prepTime: '12 min', description: 'Stir-fried rice with finely chopped vegetables and soy sauce.' },
        { id: 'd6', name: 'Egg Fried Rice', price: 160, category: 'dinner', image: '/images/egg-fried-rice.jpg', prepTime: '12 min', description: 'Fried rice tossed with fluffy scrambled eggs and spices.' },
        { id: 'd7', name: 'Chicken Fried Rice', price: 180, category: 'dinner', image: '/images/chicken-fried-rice.jpg', prepTime: '15 min', description: 'Classic fried rice with tender chicken pieces and veggies.' },

        // NOODLES
        { id: 'd33', name: 'Veg Noodles', price: 120, category: 'dinner', image: '/images/veg-noodles.png', prepTime: '12 min', description: 'Stir-fried noodles with crunchy vegetables and sauces.' },
        { id: 'd34', name: 'Chicken Noodles', price: 160, category: 'dinner', image: '/images/chicken-noodles.jpg', prepTime: '15 min', description: 'Hakka style noodles tossed with chicken and spices.' },

        // BREADS
        { id: 'd8', name: 'Butter Naan', price: 40, category: 'dinner', image: '/images/butter-naan.jpg', prepTime: '5 min', description: 'Soft and fluffy leavened bread baked in a clay oven.' },
        { id: 'd32', name: 'Parotta', price: 50, category: 'dinner', image: '/images/parotta.jpg', prepTime: '5 min', description: 'Flaky, layered flatbread made from refined flour.' },

        // SNACKS
        { id: 'd9', name: 'Mirchi Bajji', price: 50, category: 'dinner', image: '/images/mirchi-bajji.jpg', prepTime: '15 min', description: 'Spicy green chillies dipped in batter and deep-fried.' },

        // SOUPS
        { id: 'd47', name: 'Chicken Soup', price: 120, category: 'dinner', image: '/images/chicken-soup.jpg', prepTime: '15 min', description: 'Warm and comforting soup made with chicken broth and herbs.' },
        { id: 'd48', name: 'Mutton Soup', price: 160, category: 'dinner', image: '/images/mutton-soup.jpg', prepTime: '20 min', description: 'Rich bone soup extracted from mutton bones and spices.' },

        // BEVERAGES
        { id: 'd10', name: 'Tea', price: 15, category: 'dinner', image: '/images/tea.jpg', prepTime: '5 min', description: 'Hot tea.' },
        { id: 'd11', name: 'Bun', price: 10, category: 'dinner', image: '/images/bun.png', prepTime: '0 min', description: 'Sweet bun.' },
        { id: 'd12', name: 'Milk', price: 10, category: 'dinner', image: '/images/milk.png', prepTime: '5 min', description: 'Warm milk.' },
        { id: 'd41', name: 'Badam Milk', price: 20, category: 'dinner', image: '/images/badam-milk.jpg', prepTime: '0 min', description: 'Chilled almond flavored milk.' },
        { id: 'd42', name: 'Cocktail', price: 120, category: 'dinner', image: '/images/cocktail.jpg', prepTime: '10 min', description: 'Refreshing fruit cocktail.' },
        { id: 'd43', name: 'Coke', price: 40, category: 'dinner', image: '/images/coke.png', prepTime: '0 min', description: 'Chilled Coca-Cola.' },
        { id: 'd44', name: 'Sprite', price: 40, category: 'dinner', image: '/images/sprite.png', prepTime: '0 min', description: 'Chilled Sprite.' },
        { id: 'd45', name: 'Water Bottle', price: 20, category: 'dinner', image: '/images/water-bottle.png', prepTime: '0 min', description: 'Mineral water.' },
        { id: 'd46', name: 'Pepsi', price: 40, category: 'dinner', image: '/images/pepsi.png', prepTime: '0 min', description: 'Chilled Pepsi.' },

        // TIFFINS (Idli & Dosa)
        // IDLI
        { id: 'd13', name: 'Idli', price: 40, category: 'dinner', image: '/images/idli.png', prepTime: '10 min', description: 'Soft, fluffy steamed rice cakes.' },
        { id: 'd14', name: 'Ghee Idli', price: 60, category: 'dinner', image: '/images/ghee-idli.png', prepTime: '10 min', description: 'Classic Idlis topped with aromatic pure ghee.' },
        { id: 'd15', name: 'Karam Idli', price: 70, category: 'dinner', image: '/images/karam-idli.jpg', prepTime: '12 min', description: 'Spicy Idlis tossed in special Guntur chilli powder.' },
        { id: 'd16', name: 'Mini Idli', price: 50, category: 'dinner', image: '/images/mini-idli.jpg', prepTime: '10 min', description: 'Bowl of bite-sized mini idlis in sambar.' },
        { id: 'd17', name: 'Sambar Idli', price: 65, category: 'dinner', image: '/images/sambar-idli.png', prepTime: '10 min', description: 'Soft idlis soaked in lentil-based vegetable stew.' },

        // DOSA
        { id: 'd18', name: 'Plain Dosa', price: 50, category: 'dinner', image: '/images/plain-dosa.png', prepTime: '15 min', description: 'Crispy golden crepe.' },
        { id: 'd19', name: 'Ghee Dosa', price: 70, category: 'dinner', image: '/images/ghee-dosa.jpg', prepTime: '15 min', description: 'Roasted to perfection with pure ghee.' },
        { id: 'd20', name: 'Masala Dosa', price: 80, category: 'dinner', image: '/images/masala-dosa.jpg', prepTime: '18 min', description: 'Stuffed with a savory potato filling.' },
        { id: 'd21', name: 'Onion Dosa', price: 85, category: 'dinner', image: '/images/onion-dosa.png', prepTime: '18 min', description: 'Topped with crunchy onions.' },
        { id: 'd22', name: 'Onion Masala Dosa', price: 95, category: 'dinner', image: '/images/onion-masala-dosa.png', prepTime: '20 min', description: 'Topped with onions and potato masala.' },
        { id: 'd23', name: 'Butter Dosa', price: 90, category: 'dinner', image: '/images/butter-dosa.jpg', prepTime: '15 min', description: 'Cooked with rich butter.' },
        { id: 'd24', name: 'Paper Dosa', price: 100, category: 'dinner', image: '/images/paper-dosa.png', prepTime: '15 min', description: 'Extra thin and large crispy crepe.' },
        { id: 'd25', name: 'Set Dosa', price: 80, category: 'dinner', image: '/images/set-dosa.png', prepTime: '15 min', description: 'Thick and spongy pancakes.' },
        { id: 'd26', name: 'Rava Dosa', price: 85, category: 'dinner', image: '/images/rava-dosa.jpg', prepTime: '20 min', description: 'Crispy semolina crepe.' },
        { id: 'd27', name: 'Rava Onion Dosa', price: 95, category: 'dinner', image: '/images/rava-onion-dosa.jpg', prepTime: '20 min', description: 'Crispy Rava Dosa with onions.' },
        { id: 'd28', name: 'Mysore Dosa', price: 90, category: 'dinner', image: '/images/mysore-dosa.png', prepTime: '18 min', description: 'Spicy red chutney spread inside.' },
        { id: 'd29', name: 'Egg Dosa', price: 75, category: 'dinner', image: '/images/egg-dosa.jpg', prepTime: '18 min', description: 'Coated with a fluffy egg.' },
        { id: 'd30', name: 'Chicken Dosa', price: 150, category: 'dinner', image: '/images/chicken-dosa.png', prepTime: '20 min', description: 'Stuffed with spicy chicken keema.' },
        { id: 'd31', name: 'Mutton Dosa', price: 200, category: 'dinner', image: '/images/mutton-dosa.jpg', prepTime: '25 min', description: 'Filled with spicy mutton curry.' },

        // SALADS
        { id: 'd35', name: 'Salad', price: 80, category: 'dinner', image: '/images/salad.jpg', prepTime: '10 min', description: 'Fresh mixed vegetable salad.' },

        // MANDI
        { id: 'd36', name: 'Chicken Mandi', price: 350, category: 'dinner', image: '/images/chicken-mandi.jpg', prepTime: '35 min', description: 'Arabic style chicken and rice dish.' },
        { id: 'd37', name: 'Mutton Mandi', price: 450, category: 'dinner', image: '/images/mutton-mandi.jpg', prepTime: '40 min', description: 'Arabic style slow-cooked mutton.' },

        // DESSERTS
        { id: 'd39', name: 'Strawberry Ice Cream', price: 60, category: 'dinner', image: '/images/strawberry-ice-cream.jpg', prepTime: '0 min', description: 'Creamy strawberry ice cream.' },
        { id: 'd40', name: 'Peanut Butter Ice Cream', price: 60, category: 'dinner', image: '/images/peanut-butter-ice-cream.jpg', prepTime: '0 min', description: 'Peanut butter flavored ice cream.' },
        { id: 'd49', name: 'Lumma Ice Cream', price: 60, category: 'dinner', image: '/images/lumma-ice-cream.png', prepTime: '0 min', description: 'House special ice cream.' },
        { id: 'd50', name: 'Ninja Ice Cream', price: 60, category: 'dinner', image: '/images/ninja-ice-cream.jpg', prepTime: '0 min', description: 'Choco-mint fusion.' },
        { id: 'd51', name: 'Kulfi', price: 60, category: 'dinner', image: '/images/kulfi.png', prepTime: '0 min', description: 'Frozen dairy dessert.' },
        { id: 'd52', name: 'Vanilla Ice Cream', price: 60, category: 'dinner', image: '/images/vanilla-ice-cream.png', prepTime: '0 min', description: 'Classic vanilla.' },
        { id: 'd53', name: 'Mango Ice Cream', price: 60, category: 'dinner', image: '/images/mango-ice-cream.png', prepTime: '0 min', description: 'Mango flavored ice cream.' },
    ],
};

export const allItems = [...menuData.tiffins, ...menuData.lunch, ...menuData.dinner];
