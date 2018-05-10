const express      = require('express');
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const Recipe   = require('./recipes')

mongoose.Promise = Promise;
mongoose
  .connect('mongodb://localhost/culinary-collection', {useMongoClient: true})
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });


const data =  
    [
      { 
        title: 'Asian Glazed Chicken Thighs',
        level: 'Amateur Chef',
        ingredients: ['1/2 cup rice vinegar', '5 tablespoons honey', '1/3 cup soy sauce (such as Silver Swan®)', '1/4 cup Asian (toasted) sesame oil', '3 tablespoons Asian chili garlic sauce', '3 tablespoons minced garlic', 'salt to taste', '8 skinless, boneless chicken thighs'],
        cuisine: 'Asian',
        image: 'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
        duration: 40,
        instructions: ['Whisk the vinegar honey soy sauce toasted sesame oil chili garlic sauce garlic and salt in a bowl until smooth, Pour half the marinade into a large plastic zipper bag; retain the other half of the sauce, Place the chicken thighs into the bag containing marinade squeeze all the air out of the bag and seal, Shake a few times to coat chicken; refrigerate for 1 hour - turning bag once or twice, Preheat oven to 425 degrees F (220 degrees C), Pour the other half of the marinade into a saucepan over medium heat bring to a boil and cook for 3 to 5 minutes stirring often, Remove the chicken from the bag; discard used marinade, Place chicken thighs into a 9x13-inch baking dish and brush with 1/3 of the thickened marinade from the saucepan,  Bake 30 minutes - basting one more time after 10 minutes; an instant-read thermometer inserted into a chicken thigh should read 165 degrees F (75 degrees C), Let stand for 5 or 10 minutes; meanwhile bring remaining marinade back to a boil for 1 or 2 minutes, and serve chicken with marinade, Sprinkle with green onions']
      },
      { 
        title: 'Orange and Milk-Braised Pork Carnitas',
        level: 'UltraPro Chef',
        ingredients: ['3 1/2 pounds boneless pork shoulder, cut into large pieces', '1 tablespoon freshly ground black pepper', '1 tablespoon kosher salt, or more to taste', '2 tablespoons vegetable oil', '2 bay leaves', '2 teaspoons ground cumin', '1 teaspoon dried oregano', '1/4 teaspoon cayenne pepper', '1 orange, juiced and zested'],
        cuisine: 'American',
        image: 'https://images.media-allrecipes.com/userphotos/720x405/2280918.jpg',
        duration: 160,
        instructions: ['Season pork with pepper and salt,  Heat oil in large pot over high heat, Working in batches cook pork in the hot oil until browned on all sides- about 5 minutes, Return all cooked pork and accumulated juice to pot, Season pork with bay leaves cumin dried oregano and cayenne pepper, Stir in fresh orange juice orange zest and milk, Bring mixture to a boil over high heat; reduce heat to low, Cover and simmer stirring occasionally until meat is fork tender but not falling apart about 2 hours, Preheat oven to 450 degrees F (230 degrees C), Remove pork from liquid, Skim some fat from the pot to grease a baking dish, Transfer the pieces of pork to the baking dish, Drizzle about 2 more tablespoons of the floating fat over the meat, Season with more salt if needed. Bake in preheated oven until pork is browned about 15 minutes, Stir pork, Turn on ovens broiler, Cook pork under broiler until crisp, 2 to 3 minutes'],
        
      },
      { 
        title: 'Carrot Cake',
        level: 'Amateur Chef',
        ingredients: ['6 cups grated carrots', '1 cup brown sugar', '1 cup raisins', '4 eggs', '1 1/2 cups white sugar', '1 cup vegetable oil', '2 teaspoons vanilla extract', '1 cup crushed pineapple, drained', '3 cups all-purpose flour', '1 1/2 teaspoons baking soda', '1 teaspoon salt', '4 teaspoons ground cinnamon'],
        cuisine: 'International',
        dishType: ['Dessert'],
        image: 'https://www.inspiredtaste.net/wp-content/uploads/2017/07/Carrot-Cake-Recipe-4-1200.jpg',
        duration: 130,
        instructions: ['Preheat oven to 350 F, Grease and flour 3 round cake pans, Set aside, In a large bowl cream together oil sugar and brown sugar - Mix in eggs and vanilla extract and fold in carrots - Set aside, In a medium bowl whisk together flour baking soda salt cinnamon nutmeg and clove - Gradually mix the dry ingredients into the wet ingredients alternating with the buttermilk until well combined, Pour the batter evenly into the prepared cake pans, Baked for 15-18 minutes or until moist crumbs cling to a toothpick inserted into the center, Do not over bake. Cake will continue cooking as it cools.']
      },
      { 
        title: 'Rigatoni alla Genovese',
        level: 'Easy Peasy',
        ingredients: ['2 pounds red onions, sliced salt to taste', '2 (16 ounce) boxes uncooked rigatoni', '1 tablespoon chopped fresh marjoram leaves', '1 pinch cayenne pepper', '2 tablespoons freshly grated Parmigiano-Reggiano cheese'],
        cuisine: 'Italian',
        image: 'https://images.media-allrecipes.com/userphotos/720x405/3489951.jpg',
        duration: 220,
        instructions: [' Bring a large pot of water to a boil, Place the onions in the boiling water and cook covered for 15 minutes, Drain the onions and let cool a bit then slice very thinly, Heat half the oil in a large heavy pot over medium-high heat - stir in the carrots celery and bacon then cook for 4 minutes, Add the beef then cover with the onions, Pour the remaining oil over the onions then sprinkle with 1 1/2 tsp salt and 3/4 tsp pepper, Cover bring to a simmer and cook gently until the beef is tender about 2 hours; the onions will release a good deal of liquid, Uncover the pot and bring to a boil, Cook stirring more frequently as the liquid reduces and lowering the heat as necessary to prevent scorching until the meat has fallen apart and the sauce is creamy about 45 minutes, Stir in the wine and taste adding more wine if desired, Reduce the heat to low and continue to cook stirring frequently until the sauce is glossy and quite thick about 15 minutes more, Cook the pasta in a large pot of boiling salted water until al dente then drain and toss with the sauce, Stir in Parmesan to taste then serve.']
      },
      { 
        title: 'Chocolate Chip Cookies',
        level: 'Amateur Chef',
        ingredients: ['1/2 cup light brown sugar', '1 large egg', '2 tablespoons milk', '1 1/4 teaspoons vanilla extract', '2 cups semisweet chocolate chips'],
        cuisine: 'French',
        image: 'https://images-gmi-pmc.edge-generalmills.com/b9272720-c6bf-4288-92f7-43542067af7c.jpg',
        instructions: ['Preheat oven to 350 degrees F (175 degrees C),  Cream together the butter white sugar, and brown sugar until smooth, Beat in the eggs one at a time then stir in the vanilla, Dissolve baking soda in hot water, Add to batter along with salt, Stir in flour chocolate chips and nuts, Drop by large spoonfuls onto ungreased pans, Bake for about 10 minutes in the preheated oven or until edges are nicely browned.']
      },
      { 
        title: 'Chicken Cacciotore',
        level: 'UltraPro Chef',
        ingredients: ['3 chicken breasts split, 1 1/2 c. cooked down tomato juice, 5 oz. onion, diced fine , 4 oz. carrots diced fine, 1/4 c. green pepper diced fine, 1 oz. white wine vinegar (add a little basil), 1 tsp. salt, 1/8 tsp. pepper, 1/4 tsp. garlic powder or 1 clove fresh garlic, 1/2 tsp. basil, 1/4 tsp. oregano, 1/2 lb. or 4 oz. can mushrooms drained, 1/2 teaspoon brown sugar'],
        cuisine: 'Italian',
        image: 'https://www.seriouseats.com/recipes/images/2016/09/20160922-chicken-cacciatore-vicky-wasik-13.jpg',
        duration: 40,
        instructions: ['Broil chicken skin side up for 5 to 10 minutes, Make a sauce of all the other ingredients except mushrooms and brown sugar, Add chicken to sauce and simmer in covered skillet for 3/4 hour, Add mushrooms, Cook uncovered for 10 to 15 minutes, Add brown sugar stir - and serve']
      },
      { 
        title: 'Baked Fish With Apricot Sauce',
        level: 'UltraPro Chef',
        ingredients: ['1 1/2 lb. fresh or frozen halibut or other lean fish steaks cut 1-inch thick, 1/4 tsp. garlic salt, 1 (16 oz.) can unpeeled, apricot halves (in light syrup), 1 Tbsp. cornstarch, 1 to 2 tsp. curry powder, 1 tsp. soy sauce, 1/8 tsp. ground ginger, 1/2 (8 oz.) can sliced water chestnuts, 1/4 c. sliced green onions'],
        cuisine: 'Italian',
        image: 'https://images-gmi-pmc.edge-generalmills.com/dd5d7b95-67de-4578-8b5f-c6b87ebda5fd.jpg',
        duration: 40,
        instructions: ['Set oven control to broil. Grease broiler pan rack, Place fish on rack in broiler pan. Broil with tops about 4 inches from heat 4 minutes; turn. Broil about 4 minutes longer or until fish flakes easily with fork, Meanwhile mix remaining ingredients; spoon onto fish, To grill: Brush grill rack with vegetable oil, Heat grill to medium heat, Place fish on grill rack, Cover and grill 5 to 6 inches from heat 10 to 20 minutes turning once until fish flakes easily with fork, Meanwhile mix remaining ingredients; spoon onto fish during last minute of cooking.']
      },
      { 
        title: 'Light Broccoli Soup',
        level: 'Amateur Chef',
        ingredients: ['1 1/2 c. broccoli chopped, 2 ribs celery chopped, 1 onion chopped, 1 c. chicken broth, 2 c. skim milk, 2 Tbsp. cornstarch, 1/4 tsp. salt, 1/8 tsp. pepper, 1/8 tsp. ground thyme'],
        cuisine: 'American',
        image: 'http://myincrediblerecipes.com/wp-content/uploads/2016/09/broc3.jpg',
        duration: 40,
        instructions: ['Simmer vegetables until tender in chicken broth, In medium bowl combine milk cornstarch salt pepper and thyme, Add milk mixture to vegetables; cook until soup is slightly thick stirring constantly.']
      },
      { 
        title: 'Skillet Rib Eye Steaks',
        level: 'UltraPro Chef',
        ingredients: ['1 (1 1/4 pound) bone-in rib eye steaks (about 1 1/4 to 1 1/2-inch thick), 1 teaspoon Stone House Seasoning, 2 teaspoons chopped fresh rosemary leaves, 1 tablespoon unsalted butter,1 tablespoon olive oil'],
        cuisine: 'American',
        image: 'https://addapinch.com/wp-content/uploads/2018/01/skillet-rib-eye-steaks-recipe-0294-copy-700x1050.jpg',
        duration: 40,
        instructions: ['Place rib eye steak onto sheet pan and rub both sides with Stone House Seasoning to coat making sure to press the seasoning to the meat, Sprinkle with fresh rosemary leaves, Cover and refrigerate your rib eye steaks up to 3 days, When ready to cook your rib eye steaks remove from the refrigerator and allow to rest at room temperature for 30 minutes, If prepping your steaks for cooking immediately leave at room temperature for 30 minutes, To cook heat a medium skillet over medium heat, Add butter and olive oil to the skillet and allow the butter to melt completely, Tilt your skillet from side to side to make sure that your skillet is well coated with the butter and olive oil, Add your rib eye steak to the butter and olive oil and cook until the bottom of the rib eye steak is brown and caramelized about 5 minutes, Turn your rib eye steak over and cook basting your rib eye steak continuously with the butter and oil drippings from the skillet until this side of the rib eye steak is also brown and caramelized another 5 minutes or to your desired internal temperature for doneness, Remove your rib eye steak from the heat and allow to rest on a carving board for another 5 minutes, Slice your steak with a sharp knife against the grain, taking care to remove the bone, Place steak slices on two plates for serving.']
      },
    ]

    // Recipe.create ({ 
    //   title: "Sweet Mashed Potoes", 
    //   level: 'Easy Peasy',
    //   ingredients: ["Sweet Potatoes" , "Butter", "salt & Pepper", "Cream"] , 
    //   image: 'https://sweetpeaskitchen.files.wordpress.com/2010/08/maple-mashed-sweet-potatoes.jpg', 
    //   cuisine: "American", 
    //   duration: 30 , 
    //   dishType: "Other",
    //   creator: "Martha Stewart",
    // })
    // .then((recipe)=> {
    //   console.log("recipe created", recipe)
    // })
    // .catch((error)=> {
    //   console.log(error)
    // });


Recipe.insertMany(data);


