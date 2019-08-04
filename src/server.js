const express  = require('express');
const app = express();
const server  = require('http').createServer(app);
let bodyParser = require('body-parser');
let mongoClient = require('mongodb').MongoClient;
let crypto = require('crypto-js');
const socketIO = require('socket.io');
var io = socketIO(server);
const myKey = "forkify";


//mongodb connectivity
var mongoUrl = "mongodb://localhost:27017/"



//mongo DB funtions
// insertOne
// findOne
// updateOne
// deleteOne







app.use(bodyParser.urlencoded({extended: true,limit: '50mb'}))
app.use(bodyParser.json({limit: '50mb',extended: true}))

let recipe = {
  'Jalapeno Popper Grilled Cheese Sandwich':{
    'ingredients':
      `<ul>
        <li>4 oz. cream cheese</li>
        <li>softened 1 jalapeño</li>
        <li>finely chopped (seeded if desired)</li>
        <li>1 tsp. garlic powder</li>
        <li>kosher salt</li>
        <li>finely ground black pepper</li>
        <li>4 slices french bread</li>
        <li>2 c. shredded Cheddar</li>
        <li>4 slices cooked bacon, halved</li>
      </ul>`
    ,
    'preparation':
    `<ol>
      <li>Preheat oven to 375 degrees.</li>
      <li>Stuff each jalapeno half with approximately 1 ounce of cream cheese.</li>
      <li>Bake stuffed jalapenos on cookie sheet for 25-30 minutes.</li>
      <li>Place 1 slice each cheddar cheese on 2 bread slices.</li>
      <li>Place 1 slice each Monterey Jack on 2 bread slices.</li>
      <li>Top each sandwich with several pats of butter.</li>
    </ol>`
  }
    ,
    'Perfect Iced Coffee':{
      'ingredients':
      `<ul>
        <li>1 pound Ground Coffee (good, Rich Roast)</li>
        <li>8 quarts Cold Water</li>
        <li>Half-and-half (healthy Splash Per Serving)</li>
        <li>Sweetened Condensed Milk (2-3 Tablespoons Per Serving)</li>
        <li>Note: Can Use Skim Milk, 2%% Milk, Whole Milk, Sugar, Artificial Sweeteners, Syrups...adapt To Your Liking!
        </li>
      </ul>`
      ,
      'preparation':
      `<ol>
        <li>In a large container, mix ground coffee with water.</li>
        <li>Cover and allow to sit at room temperature twelve hours or overnight.</li>
        <li>Line a fine mesh strainer with cheesecloth and set over a pitcher or other container.</li>
        <li>Pour coffee/water mixture through the strainer, allowing all liquid to run through. Discard grounds.</li>
        <li>Place coffee liquid in the fridge and allow to cool.</li>
        <li>Use as needed.</li>
        <li>To make iced coffee, pack a glass full of ice cubes.</li>
        <li>Fill glass 2/3 full with coffee liquid.</li>
        <li>Add healthy splash of half-and-half.</li>
        <li>Add 2-3 tablespoons sweetened condensed milk (can use plain sugar instead) and stir to combine.</li>
        <li>Taste and adjust half-and-half and/or sweetened condensed milk as needed.</li>
      </ol>`
    },
    'Crash Hot Potatoes':{
      'ingredients':
        `<ul>
          <li>12 small yellow potatoes</li>
          <li>Koshersalt</li>
          <li>3 tablespoons olive oil</li>
          <li>Fresh ground blackpepper</li>
        </ul>`
      ,
      'preparation':
      `<ol>
        <li>In a medium saucepan over medium heat, boil the potatoes in lightly salted water until fork-tender, about 12 minutes.</li>
        <li>Preheat the oven to 475 degrees F.</li>
        <li>Place the potatoes on a baking sheet. Using a potato masher, gently press down to mash each one. The tops of the potatoes should be really textured. Drizzle the tops of the potatoes with the olive oil. Sprinkle generously with salt and pepper. Bake until golden brown and crisp, about 15 minutes. These are absolutely irresistible!</li>
        <li>Variations: Place 1/4 pat of butter on top of each smashed potato before baking. Top each smashed potato with grated Cheddar before baking.</li>
      </ol>`
    },
    'Stovetop Avocado Mac and Cheese':{
      'ingredients':
        `<ul>
          <li>2 large avocados, peeled and pitted, plus more for garnish</li>
          <li>2 tsp. lemon juice</li>
          <li>1/2 c. unsalted butter</li>
          <li>1/2 c. all-purpose flour</li>
          <li>2 c. whole milk</li>
          <li>Kosher salt</li>
          <li>Freshly ground black pepper</li>
          <li>3 1/2 c. shredded white cheddar</li>
          <li>1/2 c. freshly grated Parmesan</li>
          <li>2/3 lb. fusilli pasta, boiled</li>
        </ul>`
      ,
      'preparation':
      `<ol>
        <li>Place avocados in a medium bowl and add lemon juice to prevent browning.</li>
        <li>Mash until smooth.</li>
        <li>In a large pot or saucepan, melt butter.</li>
        <li>Sprinkle in flour and cook until slightly golden, 2 to 3 minutes. </li>
        <li>Pour in milk and whisk until combined. </li>
        <li>Season with salt and pepper.</li>
        <li>Let simmer until it starts to thicken, about 5 minutes.</li>
        <li>Turn off heat and add mashed avocado and cheeses to pot.</li>
        <li>Whisk until smooth.</li>
        <li>Add pasta and stir until fully coated in cheese sauce.</li>
        <li>Season again with salt and pepper if needed.</li>
        <li>Top with chopped avocado and serve.</li>
      </ol>`
    },
    'Buffalo Chicken Grilled Cheese Sandwich':{
      'ingredients':
        `<ul>
          <li>2 large boneless skinless chicken breasts, cooked and shredded</li>
          <li>1/3 cup buffalo sauce</li>
          <li>8 slices GO Veggie Sriracha Deli Slices (or regular cheddar cheese)</li>
          <li>8 slices bread</li>
          <li>2-3 tablespoons butter or a non-dairy butter spread, at room temperature</li>
        </ul>`
      ,
      'preparation':
      `<ol>
        <li>In a bowl, combine shredded chicken with buffalo sauce.</li>
        <li>Spread butter on one side of each slice of bread.</li>
        <li>On unbuttered side of four slices, place 1/4 of the chicken.</li>
        <li>Top chicken with 2 slices of cheese, then remaining slices of bread, buttered side up.</li>
        <li>Heat a large skillet over medium heat.</li>
        <li>Place sandwiches on hot skillet, cooking about 4-5 minutes on each side. Flip when golden brown.</li>
        <li>Sandwiches are done when cheese is melted.</li>
        <li>Depending on the size of your skillet, you may need to work in batches if all of the sandwiches don't fit. Alternately, you can cook the sandwiches on a panini maker if you have one available.</li>
        <li>Cut in half and enjoy!</li>
      </ol>`
    },
    'Cinnamon Rolls':{
      'ingredients':
        `<ul>
          <li>1/4 cup butter, divided</li>
         </ul>
         <h5>Dough:</h5>
         <ul>
          <li>2 cups all-purpose flour</li>
          <li>2 tablespoons white sugar</li>
          <li>2 teaspoons baking powder</li>
          <li>1 teaspoon salt</li>
          <li>3 tablespoons butter, softened</li>
          <li>3/4 cup milk</li>
          <li>1 egg</li>
         </ul>
         <h5>Filling:</h5>
         <ul>
          <li>1/2 cup white sugar</li>
          <li>1/2 cup brown sugar</li>
          <li>1 tablespoon ground cinnamon</li>
         </ul>
         <h5>Cream Cheese Frosting:</h5>
         <ul>
          <li>1 cup confectioners' sugar (optional)</li>
          <li>4 ounces cream cheese, softened (optional)</li>
          <li>1/4 cup butter, softened (optional)</li>
          <li>1/2 teaspoon vanilla extract (optional)</li>
        </ul>`
      ,
      'preparation':
      `<ol>
        <li>Preheat oven to 400 degrees F (200 degrees C). Brush a 9-inch square baking dish with 2 tablespoons melted butter.</li>
        <li>Whisk flour, 2 tablespoons white sugar, baking powder, and salt together in a large bowl. Work 3 tablespoons softened butter into flour mixture using your hands. Beat milk and egg together in another bowl; pour into flour-butter mixture and stir with a rubber spatula until a soft dough forms.</li>
        <li>Turn dough out onto a floured work surface and roll dough into a 1/4-inch thick rectangle. Brush surface of dough with 2 tablespoons melted butter.</li>
        <li>Whisk 1/2 cup white sugar, brown sugar, and cinnamon together in a small bowl. Sprinkle 1/2 of the cinnamon sugar mixture in the bottom of the prepared baking dish. Sprinkle remaining cinnamon sugar over butter-brushed dough. Roll dough around filling to form a log; cut log into 18 rolls and place rolls in the prepared baking dish.</li>
        <li>Bake in the preheated oven until rolls are set, 20 to 25 minutes.</li>
        <li>Beat confectioners' sugar, cream cheese, 1/4 cup softened butter, and vanilla extract together in a bowl until frosting is smooth. Top hot cinnamon rolls with cream cheese frosting.</li>
      </ol>`
    },
    'Best Pizza Dough Ever':{
      'ingredients':
        `<ul>
          <li>2-2 1/3 cups all-purpose flour OR bread flour* divided (250-295g)</li>
          <li>1 packet instant yeast (2 1/4 teaspoon)</li>
          <li>1 1/2 teaspoons sugar</li>
          <li>3/4 teaspoon salt</li>
          <li>1/8-1/4 teaspoon garlic powder and/or dried basil leaves optional</li>
          <li>2 Tablespoons olive oil + additional</li>
          <li>3/4 cup warm water</li>
        </ul>`
      ,
      'preparation':
      `<ol>
        <li>Combine 1 cup (125g) of flour, instant yeast, sugar, and salt in a large bowl. If desired, add garlic powder and dried basil at this point as well.</li>
        <li>Add olive oil and warm water and use a wooden spoon to stir well very well.</li>
        <li>Gradually add another 1 cup (125g) of flour. Add any additional flour as needed (I've found that sometimes I need as much as an additional 1/3 cup), stirring until the dough is forming into a cohesive, elastic ball and is beginning to pull away from the sides of the bowl (see video above recipe for visual cue). The dough will still be slightly sticky but still should be manageable with your hands.</li>
        <li>Drizzle a separate, large, clean bowl generously with olive oil and use a pastry brush to brush up the sides of the bowl.</li>
        <li>Lightly dust your hands with flour and form your pizza dough into a round ball and transfer to your olive oil-brushed bowl. Use your hands to roll the pizza dough along the inside of the bowl until it is coated in olive oil, then cover the bowl tightly with plastic wrap and place it in a warm place.</li>
        <li>Allow dough to rise for 30 minutes or until doubled in size. If you intend to bake this dough into a pizza, I also recommend preheating your oven to 425F (215C) at this point so that it will have reached temperature once your pizza is ready to bake.</li>
        <li>Once the dough has risen, use your hands to gently deflate it and transfer to a lightly floured surface and knead briefly until smooth (about 3-5 times).</li>
        <li>Use either your hands or a rolling pin to work the dough into 12" circle.</li>
        <li>Transfer dough to a parchment paper lined pizza pan and either pinch the edges or fold them over to form a crust.</li>
        <li>Drizzle additional olive oil (about a Tablespoon) over the top of the pizza and use your pastry brush to brush the entire surface of the pizza (including the crust) with olive oil.</li>
        <li>Use a fork to poke holes all over the center of the pizza to keep the dough from bubbling up in the oven.</li>
        <li>Add desired toppings and bake in a 425F (215C) preheated oven for 13-15 minutes or until toppings are golden brown. Slice and serve.</li>
      </ol>`
    },
    'Magic Sauce':{
      'ingredients':
        `<ul>
          <li>1/2 cup extra-virgin olive oil</li>
          <li>1 teaspoon fresh rosemary leaves</li>
          <li>1 teaspoon fresh thyme leaves</li>
          <li>1 teaspoon fresh oregano leaves</li>
          <li>2 teaspoons sweet paprika</li>
          <li>2 medium cloves of garlic, smashed into a paste</li>
          <li>1 well-crumbled bay leaf</li>
          <li>pinch of red pepper flakes</li>
          <li>1/4+ teaspoon fine grain sea salt</li>
          <li>1 tablespoon fresh lemon juice</li>
        </ul>`
      ,
      'preparation':
      `<ol>
        <li>Gently warm the olive oil over medium-low heat in a skillet or pan, until it is just hot. When hot remove from heat.</li>
        <li>While the oil is heating, lightly pound the rosemary, thyme, and oregano in a mortar and pestle.</li>
        <li>Stir the paprika, garlic, bay leaf, red pepper flakes, and salt into the oil. Then add the bruised herbs and lemon juice.</li>
        <li>You can use this now, but know - the oil just gets better as it ages over a few days. Keep it in a refrigerator for up to a week/ten days-ish. It thickens up when cold, so if you need it in a liquid state, place it in the sun or in a warm place for a few minutes.</li>
      </ol>`
    },
    'Spicy Dr Pepper Shredded Pork':{
      'ingredients':
        `<ul>
          <li>1 whole Large Onion</li>
          <li>1 whole Pork Shoulder ("pork Butt") - 5 To 7 Pounds</li>
          <li>Salt And Freshly Ground Black Pepper</li>
          <li>1 can (11 Ounce) Chipotle Peppers In Adobo Sauce</li>
          <li>2 cans Dr. Pepper</li>
          <li>2 Tablespoons Brown Sugar</li>
        </ul>`
      ,
      'preparation':
        `<ol>
          <li>Preheat oven to 300 degrees.</li>
          <li>Peel the onion and cut it into wedges. Lay them in the bottom of a large dutch oven.</li>
          <li>Generously salt and pepper the pork roast, then set it on top of the onions in the pan.</li>
          <li>Pour the can of chipotle peppers over the pork (include the sauce.) Pour in both cans of Dr Pepper. Add brown sugar to the juice and stir in.</li>
          <li>Place lid tightly on pot, then set pot in the oven. Cook for at least six hours, turning roast two or three times during the cooking process. Check meat after six hours; it should be absolutely falling apart (use two forks to test.) If it's not falling apart, return to the oven for another hour. </li>
          <li>Remove meat from pot and place on a cutting board or other work surface. Use two forks to shred meat, discarding large pieces of fat. Strain as much of the fat off the top of the cooking liquid as you can and discard it. Return the shredded meat to the cooking liquid, and keep warm until ready to serve. (You can also refrigerate the meat and liquid separately, then remove hardened fat once it's cold. Then heat up the liquid on the stovetop and return the meat to the liquid to warm up. </li>
          <li>Serve on warm flour tortillas. Top with shredded lettuce, diced tomatoes, grated cheese, avocado slices, salsa, and whatever else you'd like.</li>
        </ol>`
    },
    'Parmesan Roasted Potatoes':{
      'ingredients':
        `<ul>
          <li>cooking spray</li>
          <li>1 teaspoon vegetable oil, or as needed</li>
          <li>2 tablespoons freshly grated Parmesan cheese</li>
          <li>1/2 teaspoon salt</li>
          <li>1/2 teaspoon garlic powder</li>
          <li>1/2 teaspoon paprika</li>
          <li>1/4 teaspoon ground black pepper</li>
          <li>2 pounds red potatoes, halved</li>
          <li>1 tablespoon vegetable oil, or as needed</li>
          <li>1/4 cup sour cream (optional)</li>
        </ul>`
      ,
      'preparation':
        `<ol>
          <li>Preheat oven to 400 degrees F (200 degrees C). Spray a 9x13-inch baking pan or cast iron skillet with cooking spray; pour in about 1 teaspoon vegetable oil to coat the bottom.</li>
          <li>Mix Parmesan cheese, salt, garlic powder, paprika, and black pepper together in a bowl.</li>
          <li>Blot the cut-side of potatoes with a paper towel to remove any moisture. Place potatoes in a bowl and drizzle with 1 tablespoon vegetable oil; toss until potatoes are lightly coated. Sprinkle potatoes with Parmesan cheese mixture; toss to coat. Arrange potatoes, cut-side down, onto the prepared baking pan.</li>
          <li>Bake in the preheated oven for 15 to 20 minutes. Turn potatoes to cut-side up; continue baking until golden and crispy, about 15 to 20 more minutes. Serve with sour cream.</li>
        </ol>`
    },
    'Bacon Wrapped Jalapeno Popper Stuffed Chicken':{
      'ingredients':
        `<ul>
          <li>4 boneless skinless chicken breasts</li>
          <li>4 large jalapenos</li>
          <li>4 oz cream cheese softened</li>
          <li>4 oz medium cheddar cheese shredded</li>
          <li>1 Tablespoon Hey Grill Hey’s Sweet BBQ Rub link in recipe notes</li>
          <li>12 pieces bacon</li>
          <li>2 Tablespoons Hey Grill Hey’s Sweet BBQ Rub link in recipe notes</li>
          <li>1/2 cup Kansas City bbq sauce link in recipe notes</li>
        </ul>`
      ,
      'preparation':
        `<ol>
          <li>Preheat your smoker to 250 degrees F for indirect heat with mild wood like apple or hickory.</li>
          <li>Prepare your poppers by slicing the tops off of the jalapenos, cutting them in half, and scraping out the ribs and seeds inside of the poppers.</li>
          <li>In a small bowl, combine the cream cheese, cheddar cheese, and the 1 Tablespoon of sweet rub. Use the back of the spoon to press the filling mixture into each half of the cleaned out peppers and then press the pepper halves back together.</li>
          <li>On a large cutting board, slice the chicken breasts open, without slicing all of the way through the breasts. Set one filled popper inside of each chicken breast and fold them closed.</li>
          <li>Wrap each chicken breast with about 3 slices of bacon. Secure the bacon ends with toothpicks, if necessary. Season the stuffed chicken on all sides with more of the sweet rub.</li>
          <li>Place the chicken breasts on the smoker, close the lid and cook until the internal temperature reaches 150 degrees F. This process usually takes an hour and a half. Baste the chicken liberally with BBQ sauce, close the lid, and continue cooking until the internal temperature reaches 165 degrees F.</li>
          <li>Remove the chicken to a cutting board or serving platter and allow it to rest for about 10 minutes before serving. Enjoy!!</li>
        </ol>`
    },
    'The Best Chocolate Cake':{
      'ingredients':
        `<ul>
          <li>butter and flour for coating and dusting the cake pan</li>
          <li>3 cups all-purpose flour</li>
          <li>3 cups granulated sugar</li>
          <li>1 1/2 cups unsweetened cocoa powder</li>
          <li>1 tablespoon baking soda</li>
          <li>1 1/2 teaspoons baking powder</li>
          <li>1 1/2 teaspoons salt</li>
          <li>4 large eggs</li>
          <li>1 1/2 cups buttermilk</li>
          <li>1 1/2 cups warm water</li>
          <li>1/2 cup vegetable oil</li>
          <li>2 teaspoons vanilla extract</li>
        </ul>`
      ,
      'preparation':
        `<ol>
          <li>Preheat oven to 350 degrees. Butter three 9-inch cake rounds. Dust with flour and tap out the excess.</li>
          <li>Mix together flour, sugar, cocoa, baking soda, baking powder, and salt in a stand mixer using a low speed until combined.</li>
          <li>Add eggs, buttermilk, warm water, oil, and vanilla. Beat on a medium speed until smooth. This should take just a couple of minutes.</li>
          <li>Divide batter among the three pans. I found that it took just over 3 cups of the batter to divide it evenly.</li>
          <li>Bake for 30-35 minutes until a toothpick inserted into the center comes out clean.</li>
          <li>Cool on wire racks for 15 minutes and then turn out the cakes onto the racks and allow to cool completely.</li>
          <li>Frost with your favorite frosting and enjoy!</li>
        </ol>`
    },
    'Hot Spinach and Artichoke Dip':{
      'ingredients':
        `<ul>
          <li>1 (14-ounce) jar artichoke hearts, drained and chopped</li>
          <li>2 cups chopped fresh baby spinach or 1 (10-ounce) package frozen chopped spinach, thawed and drained</li>
          <li>1 (8-ounce) package cream cheese, softened</li>
          <li>½ cup sour cream, mayonnaise, or whole milk Greek yogurt</li>
          <li>2 cups grated Parmesan cheese, divided</li>
          <li>1 teaspoon Stone House Seasoning</li>
        </ul>`
      ,
      'preparation':
        `<ol>
          <li>Preheat oven to 350º F.</li>
          <li> Mix all ingredients together</li>
          <li>Reserving 1/2 cup Parmesan cheese for topping, until well combined and pour into a shallow baking dish.</li>
          <li>Bake for 20 minutes.</li>
          <li>Serve warm with chips.</li>
        </ol>`
    },
    'Smashed Chickpea & Avocado Salad Sandwich':{
      'ingredients':
        `<ul>
          <li>1 15 ounce can chickpeas or garbanzo beans</li>
          <li>1 large ripe avocado</li>
          <li>1/4 cup fresh cilantro chopped</li>
          <li>2 tablespoons chopped green onion</li>
          <li>Juice from 1 lime</li>
          <li>Salt and pepper to taste</li>
          <li>Bread of your choice I use whole wheat bread</li>
          <li>Fresh spinach leaves or other sandwich toppings: lettuce tomato slices, sprouts, etc.</li>
        </ul>`
      ,
      'preparation':
        `<ol>
          <li>Rinse and drain the chickpeas. Place on a paper towel and remove the outer skins. You can leave them on, but I like to remove them.</li>
          <li>In a medium bowl, using a fork or potato masher smash the chickpeas and avocado together. Add in cilantro, green onion, and lime juice. Season with salt and pepper, to taste.</li>
          <li>Spread salad on bread and top with your favorite sandwich toppings. I like to add fresh spinach leaves.</li>
          <li>Note: This salad also makes a great dip. Serve with cut up veggies, crackers, or pita chips. Also, this salad is best eaten the day it is made because it will turn brown due to the avocado.</li>
        </ol>`
    },
    'Restaurant Style Salsa':{
      'ingredients':
        `<ul>
          <li>Two 10-ounce cans diced tomatoes and green chiles, such as Rotel</li>
          <li>One 28-ounce can whole tomatoes with juice</li>
          <li>1/2 cup fresh cilantro leaves (or more to taste!)</li>
          <li>1/4 cup chopped onion</li>
          <li>1 clove garlic, minced</li>
          <li>1 whole jalapeno, quartered and sliced thin, with seeds and membrane </li>
          <li>1/4 teaspoon ground cumin</li>
          <li>1/4 teaspoon salt</li>
          <li>1/4 teaspoon sugar</li>
          <li>1/2 whole lime, juiced</li>
        </ul>`
      ,
      'preparation':
        `<ol>
          <li>Combine the diced tomatoes, whole tomatoes, cilantro, onions, garlic, jalapeno, cumin, salt, sugar and lime juice in a blender or food processor. (This is a very large batch. I recommend using a 12-cup food processor, or you can process the ingredients in batches and then mix everything together in a large mixing bowl.) </li>
          <li>Pulse until you get the salsa to the consistency you'd like. I do about 10 to 15 pulses. Test seasonings with a tortilla chip and adjust as needed. </li>
          <li>Refrigerate the salsa for at least an hour before serving.</li>
        </ol>`
    },
    'The Best Lasagna Ever':{
      'ingredients':
        `<ul>
          <li>1 pound sweet Italian sausage</li>
          <li>3/4 pound lean ground beef</li>
          <li>1/2 cup minced onion</li>
          <li>2 cloves garlic, crushed</li>
          <li>1 (28 ounce) can crushed tomatoes</li>
          <li>2 (6 ounce) cans tomato paste</li>
          <li>2 (6.5 ounce) cans canned tomato sauce</li>
          <li>1/2 cup water</li>
          <li>2 tablespoons white sugar</li>
          <li>1 1/2 teaspoons dried basil leaves</li>
          <li>1/2 teaspoon fennel seeds</li>
          <li>1 teaspoon Italian seasoning</li>
          <li>1 1/2 teaspoons salt, divided, or to taste</li>
          <li>1/4 teaspoon ground black pepper</li>
          <li>4 tablespoons chopped fresh parsley</li>
          <li>12 lasagna noodles</li>
          <li>16 ounces ricotta cheese</li>
          <li>1 egg</li>
          <li>3/4 pound mozzarella cheese, sliced</li>
          <li>3/4 cup grated Parmesan cheese</li>
        </ul>`
      ,
      'preparation':
        `<ol>
          <li>In a Dutch oven, cook sausage, ground beef, onion, and garlic over medium heat until well browned. Stir in crushed tomatoes, tomato paste, tomato sauce, and water. Season with sugar, basil, fennel seeds, Italian seasoning, 1 teaspoon salt, pepper, and 2 tablespoons parsley. Simmer, covered, for about 1 1/2 hours, stirring occasionally.</li>
          <li>Bring a large pot of lightly salted water to a boil. Cook lasagna noodles in boiling water for 8 to 10 minutes. Drain noodles, and rinse with cold water. In a mixing bowl, combine ricotta cheese with egg, remaining parsley, and 1/2 teaspoon salt.</li>
          <li>Preheat oven to 375 degrees F (190 degrees C).</li>
          <li>To assemble, spread 1 1/2 cups of meat sauce in the bottom of a 9x13 inch baking dish. Arrange 6 noodles lengthwise over meat sauce. Spread with one half of the ricotta cheese mixture. Top with a third of mozzarella cheese slices. Spoon 1 1/2 cups meat sauce over mozzarella, and sprinkle with 1/4 cup Parmesan cheese. Repeat layers, and top with remaining mozzarella and Parmesan cheese. Cover with foil: to prevent sticking, either spray foil with cooking spray, or make sure the foil does not touch the cheese.</li>
          <li>Bake in preheated oven for 25 minutes. Remove foil, and bake an additional 25 minutes. Cool for 15 minutes before serving.</li>
        </ol>`
    },
    'Mac and Cheese with Roasted Chicken, Goat Cheese, and Rosemary':{
      'ingredients':
        `<ul>
          <li>1 tablespoon vegetable oil</li>
          <li>1 pound dried rigatoni</li>
          <li>1 quart heavy cream</li>
          <li>2 tablespoons chopped fresh rosemary</li>
          <li>1 clove fresh garlic, crushed</li>
          <li>8 ounces goat cheese</li>
          <li>2 cups shredded roasted chicken</li>
          <li>salt and pepper to taste</li>
        </ul>`
      ,
      'preparation':
        `<ol>
          <li>Place a large pot of salted water over high heat and bring to a rapid boil. Add the oil and rigatoni to the water and cook according to the directions on the package, 10-12 minutes.</li>
          <li>While you are waiting for the water to boil, pour the cream into a large sauce pan over medium heat. Add the rosemary and garlic to the cream and bring it to a simmer - take care not to let it boil over. Allow the cream to reduce by about half.</li>
          <li>Stir in the goat cheese and chicken and continue cooking cooking it till the cream coats the back of a spoon.</li>
          <li>Thoroughly drain the pasta. Add the pasta to the sauce. Coat the pasta in the sauce and simmer over low heat for a few minutes. Serve hot.</li>
        </ol>`
    },
    'Guinness Chocolate Cheesecake':{
      'ingredients':
        `<ul>
          <li>1 cup graham cracker crumbs (gluten-free for gluten-free)</li>
          <li>2 tablespoons cocoa powder</li>
          <li>1 tablespoon sugar</li>
          <li>2 tablespoons butter, melted</li>
          <li>12 ounces dark chocolate, chopped</li>
          <li>2 tablespoons heavy cream</li>
          <li>3 (8 ounce) packages cream cheese</li>
          <li>1 cup sugar</li>
          <li>1/2 cup sour cream</li>
          <li>3 eggs</li>
          <li>1 teaspoon vanilla extract</li>
          <li>3/4 cup Guinness</li>
        </ul>`
      ,
      'preparation':
        `<ol>
          <li>Mix the graham cracker crumbs, cocoa powder, sugar, and butter and press into the bottom of a 9 inch spring form pan.</li>
          <li>Melt the chocolate in the cream in a double boiler.</li>
          <li>Cream the cream cheese.</li>
          <li>Mix in the sugar, chocolate, sour cream, eggs, vanilla, and Guinness.</li>
          <li>Pour the mixture into the spring form pan.</li>
          <li>Bake in a preheated 350F/180C oven for 60 minutes.</li>
          <li>Turn off heat and leave cheesecake in the oven with the door slightly ajar for 60 minutes.</li>
          <li>Let it cool completely.</li>
          <li>Chill the cheesecake in the fridge overnight.</li>
        </ol>`
    },
    'Banana Bread':{
      'ingredients':
        `<ul>
          <li>2 to 3 very ripe bananas, peeled (about 1 1/4 to 1 1/2 cups mashed)</li>
          <li>1/3 cup melted butter, unsalted or salted</li>
          <li>1 teaspoon baking soda</li>
          <li>Pinch of salt</li>
          <li>3/4 cup sugar (1/2 cup if you would like it less sweet, 1 cup if more sweet)</li>
          <li>1 large egg, beaten</li>
          <li>1 teaspoon vanilla extract</li>
          <li>1 1/2 cups of all-purpose flour</li>
        </ul>`
      ,
      'preparation':
        `<ol>
          <li>Preheat the oven to 350°F (175°C), and butter a 4x8-inch loaf pan.</li>
          <li>In a mixing bowl, mash the ripe bananas with a fork until completely smooth. Stir the melted butter into the mashed bananas.</li>
          <li> Mix in the baking soda and salt. Stir in the sugar, beaten egg, and vanilla extract. Mix in the flour.</li>
          <li> Pour the batter into your prepared loaf pan. Bake for 50 minutes to 1 hour at 350°F (175°C), or until a tester inserted into the center comes out clean.</li>
          <li> Remove from oven and let cool in the pan for a few minutes. Then remove the banana bread from the pan and let cool completely before serving. Slice and serve. (A bread knife helps to make slices that aren't crumbly.)</li>
        </ol>`
    },
    'The Best Rolled Sugar Cookies':{
      'ingredients':
        `<ul>
          <li>1 1/2 cups butter, softened</li>
          <li>2 cups white sugar</li>
          <li>4 eggs</li>
          <li>1 teaspoon vanilla extract</li>
          <li>5 cups all-purpose flour</li>
          <li>2 teaspoons baking powder</li>
          <li>1 teaspoon salt</li>
        </ul>`
      ,
      'preparation':
        `<ol>
          <li>In a large bowl, cream together butter and sugar until smooth. Beat in eggs and vanilla. Stir in the flour, baking powder, and salt. Cover, and chill dough for at least one hour (or overnight).</li>
          <li>Preheat oven to 400 degrees F (200 degrees C). Roll out dough on floured surface 1/4 to 1/2 inch thick. Cut into shapes with any cookie cutter. Place cookies 1 inch apart on ungreased cookie sheets.</li>
          <li>Bake 6 to 8 minutes in preheated oven. Cool completely.</li>
        </ol>`
    },
    'Guacamole Grilled Cheese Sandwich':{
      'ingredients':
        `<ul>
          <li>2 ripe avocados</li>
          <li>1/2 small onion minced</li>
          <li>1 clove garlic minced</li>
          <li>1 small jalapeño stems and seeds removed, minced</li>
          <li>2 tablespoons cilantro leaves finely chopped</li>
          <li>1 tablespoon of fresh lime juice</li>
          <li>1/2 teaspoon coarse salt</li>
          <li>A dash of freshly grated black pepper</li>
          <li>1 Roma tomato chopped</li>
        </ul>
        <h4>For the Grilled Cheese:</h4>
        <ul>
          <li>4 slices crusty white bread</li>
          <li>4 slices Cheddar cheese</li>
          <li>Butter for buttering bread</li>
        </ul>`
      ,
      'preparation':
        `<ol>
          <li>Make the guacamole-cut avocados in half.</li>
          <li> Remove seed.</li>
          <li>Scoop out avacado from the peel, put in a large bowl.</li>
          <li>Using a fork, mash the avocado.</li>
          <li>Add the onion, garlic, jalapeño, cilantro, lime juice, salt and pepper.</li>
          <li>Stir until well combined. Add the chopped tomato and stir.</li>
          <li>Heat a pan or griddle to medium-high heat.</li>
          <li>Spread desired amount of guacamole on both slices of bread then top with cheese.</li>
          <li>Butter outer slices of bread and grill on one side for about 2 minutes or until golden and crispy.</li>
          <li>Flip the sandwich and grill until golden brown.</li>
          <li>Make the other sandwich the same way and serve warm.</li>
        </ol>`
    },
    'Two-Ingredient Banana Peanut Butter Ice Cream':{
      'ingredients':
        `<ul>
          <li>4 large very ripe bananas</li>
          <li>2 tablespoons peanut butter</li>
        </ul>`
      ,
      'preparation':
        `<ol>
          <li>Peel bananas and slice into 1/2 inch discs.</li>
          <li>Arrange banana slices in a single layer on a large plate or baking sheet.</li>
          <li>Freeze for 1-2 hours.</li>
          <li>Place the banana slices in a food processor or powerful blender.</li>
          <li>Puree banana slices, scraping down the bowl as needed.</li>
          <li>Puree until the mixture is creamy and smooth.</li>
          <li>Add the peanut butter and puree to combine.</li>
          <li>Serve immediately for soft-serve ice cream consistency.</li>
          <li>If you prefer harder ice cream, place in the freezer for a few hours and then serve.</li>
          <li>*Note-if you have a hard time creating a creamy consistency, you can add 1-2 tablespoons of milk to help puree the banana slices.</li>
          <li>Make sure you use a powerful food processor or blender!</li>
        </ol>`
    },
    'Easy Shepherd’s Pie':{
      'ingredients':
        `<ul>
          <li>1 1/2 to 2 pounds potatoes (about 3 large potatoes), peeled and quartered</li>
          <li>8 Tablespoons (1 stick) butter</li>
          <li>1 medium onion, chopped (about 1 1/2 cups)</li>
          <li>1-2 cups vegetables—diced carrots, corn, peas</li>
          <li>1 1/2 lbs ground round beef</li>
          <li>1/2 cup beef broth</li>
          <li>1 teaspoon Worcestershire sauce</li>
          <li>Salt, pepper, other seasonings of choice</li>
        </ul>`
      ,
      'preparation':
        `<ol>
          <li><h5>Boil the potatoes:</h5> Place the peeled and quartered potatoes in medium sized pot. Cover with at least an inch of cold water. Add a teaspoon of salt. Bring to a boil, reduce to a simmer, and cook until tender (about 20 minutes).</li>
          <li><h5>Sauté vegetables:</h5> While the potatoes are cooking, melt 4 tablespoons of the butter in a large sauté pan on medium heat. Add the chopped onions and cook until tender, about 6 to 10 minutes.
          If you are including vegetables, add them according to their cooking time. Carrots should be cooked with the onions, because they take as long to cook as the onions do.
          If you are including peas or corn, add them toward the end of the cooking of the onions, or after the meat starts to cook, as they take very little cooking time.</li>
          <li><h5>Add the ground beef, then Worcestershire sauce and broth:</h5> Add ground beef to the pan with the onions and vegetables. Cook until no longer pink. Season with salt and pepper.

          Add the Worcestershire sauce and beef broth. Bring the broth to a simmer and reduce heat to low. Cook uncovered for 10 minutes, adding more beef broth if necessary to keep the meat from drying out.</li>
          <li><h5>Mash the cooked potatoes:</h5> When the potatoes are done cooking (a fork can easily pierce), remove them from the pot and place them in a bowl with the remaining 4 Tbsp of butter. Mash with a fork or potato masher, and season with salt and pepper to taste.</li>
          <li><h5>Layer the meat mixture and mashed potatoes in a casserole dish:</h5> Preheat oven to 400°F. Spread the beef, onions, and vegetables (if using) in an even layer in a large baking dish (8x13 casserole).</li>
        </ol>`
    },
    'Buffalo Chicken Chowder':{
      'ingredients':
        `<ul>
          <li>2 tablespoons butter</li>
          <li>1 onion, diced</li>
          <li>2 carrots, diced</li>
          <li>2 stalks celery, diced</li>
          <li>2 cloves garlic, chopped</li>
          <li>1/4 cup flour (rice flour for gluten free)</li>
          <li>3 cups chicken broth or chicken stock</li>
          <li>1 pound cooked chicken, diced or shredded</li>
          <li>hot sauce to taste (I used 1/4 cup Franks Red Hot sauce)</li>
          <li>1 large yukon gold or other boiling potato, peeled and cut into bite sized pieces
          salt and pepper to taste</li>
          <li>1 cup heavy cream</li>
          <li>1/4 cup blue cheese, crumbled</li>
        </ul>`
      ,
      'preparation':
        `<ol>
          <li>Melt the butter in a large sauce pan over medium-high heat, add the onion, carrots and celery and cook until tender, about 8-10 minutes.</li>
          <li>Add the garlic and cook until fragrant, about a minute.</li>
          <li>Mix in the flour and let it cook for 2-3 minutes.</li>
          <li>Add the chicken broth, chicken, hot sauce and potatoes, bring to a boil, reduce the heat and simmer until the potatoes are tender, about 10-15 minutes.</li>
          <li>Season with salt and pepper, mix in the cream and blue cheese and remove from heat when the cheese has melted.</li>
        </ol>`
    },
    'Best Brownies':{
      'ingredients':
        `<ul>
          <li>1/2 cup + 2 tablespoons salted butter melted</li>
          <li>1 cup granulated sugar</li>
          <li>2 large eggs</li>
          <li>2 teaspoons vanilla extract</li>
          <li>1/2 cup melted milk chocolate chips</li>
          <li>3/4 cup all-purpose flour</li>
          <li>1/4 cup unsweetened cocoa powder</li>
          <li>1/2 teaspoon salt</li>
          <li>1 cup milk chocolate chips</li>
        </ul>`
      ,
      'preparation':
        `<ol>
          <li>Preheat oven to 350 degrees F. Line a metal 9x9 pan with parchment paper.</li>
          <li>Pour melted butter into a large mixing bowl. Whisk in sugar by hand until smooth, 30 seconds.</li>
          <li>Add in eggs and vanilla extract. Whisk 1 minute.</li>
          <li>Whisk in melted chocolate until combined and smooth.</li>
          <li>Use a rubber spatula to stir in flour, cocoa powder, and salt until just combined. Stir in whole chocolate chips.</li>
          <li>Pour into prepared pan and smooth out.</li>
          <li>Bake in the preheated oven for 30 minutes. Let cool in pan 30 minutes before slicing.</li>
        </ol>`
    },
    'Slow Cooker Chicken Tortilla Soup':{
      'ingredients':
        `<ul>
          <li>1/2 cup white onion diced</li>
          <li>1/2 cup red bell pepper diced</li>
          <li>1 cup frozen corn</li>
          <li>1 15 ounce can black beans rinsed and drained</li>
          <li>1 1/4 lbs boneless skinless chicken breasts</li>
          <li>1 4 ounce can mild green chilies</li>
          <li>1 8 ounce can tomato sauce</li>
          <li>1 14.5 ounce can diced tomatoes do not drain</li>
          <li>2 teaspoons chili powder</li>
          <li>1 teaspoon cumin</li>
          <li>1/2 teaspoon garlic powder</li>
          <li>6 cups chicken broth</li>
          <li>1 teaspoon kosher salt</li>
          <li>2 tablespoons cilantro leaves chopped</li>
          <li>1 cup tortilla strips or more if desired</li>
          <li>Toppings such as sour cream, avocado, olives and shredded cheese</li>
        </ul>`
      ,
      'preparation':
        `<ol>
          <li>Place the onion, bell pepper, corn, black beans, chicken, chilies, tomato sauce, tomatoes, chili powder, cumin, garlic powder, chicken broth and salt into a slow cooker. Stir to combine.</li>
          <li>Cover and cook on LOW for 6-8 hours or HIGH for 3-4 hours.</li>
          <li>Remove the chicken breasts from the pot and shred with two forks. Return the chicken to the pot.</li>
          <li>Stir in the chopped cilantro and ladle into bowls. Top with tortilla strips and any other toppings you desire. Serve immediately.</li>
        </ol>`
    },
    'Banana Crumb Muffins':{
      'ingredients':
        `<ul>
          <li>1-1/2 cups all-purpose flour</li>
          <li>1 teaspoon baking soda</li>
          <li>1 teaspoon baking powder</li>
          <li>1/2 teaspoon salt</li>
          <li>3 large ripe bananas, mashed</li>
          <li>3/4 cup sugar</li>
          <li>1 egg, lightly beaten</li>
          <li>1/2 cup butter, melted</li>
        </ul>
        <h3>TOPPING:</h3>
        <ul>
          <li>1/3 cup packed brown sugar</li>
          <li>1 tablespoon all-purpose flour</li>
          <li>1/8 teaspoon ground cinnamon</li>
          <li>1 tablespoon cold butter</li>
        </ul>`
      ,
      'preparation':
        `<ol>
          <li>In a large bowl, combine dry ingredients. Combine bananas, sugar, egg and butter; mix well. Stir into dry ingredients just until moistened.</li>
          <li>Fill greased or paper-lined muffin cups three-fourths full. Combine the first three topping ingredients; cut in butter until crumbly. Sprinkle over muffins.</li>
          <li>Bake at 375° for 18-20 minutes or until muffins test done. Cool in pan 10 minutes before removing to a wire rack.</li>
        </ol>`
    },
    'Banana Banana Bread':{
      'ingredients':
        `<ul>
          <li>2 cups all-purpose flour</li>
          <li>1 teaspoon baking soda</li>
          <li>1/4 teaspoon salt</li>
          <li>1/2 cup butter</li>
          <li>3/4 cup brown sugar</li>
          <li>2 eggs, beaten</li>
          <li>2 1/3 cups mashed overripe bananas</li>
        </ul>`
      ,
      'preparation':
        `<ol>
          <li>Preheat oven to 350 degrees F (175 degrees C).</li>
          <li>Lightly grease a 9x5 inch loaf pan.</li>
          <li>In a large bowl, combine flour, baking soda and salt.</li>
          <li>In a separate bowl, cream together butter and brown sugar.</li>
          <li>Stir in eggs and mashed bananas until well blended.</li>
          <li>Stir banana mixture into flour mixture; stir just to moisten.</li>
          <li>Pour batter into prepared loaf pan.</li>
          <li>Bake in preheated oven for 60 to 65 minutes, until a toothpick inserted into center of the loaf comes out clean.</li>
          <li>Let bread cool in pan for 10 minutes, then turn out onto a wire rack.</li>
        </ol>`
    },
    'Nikki':{
      'ingredients':
        `<ul>
          <li>3 large ripe bananas, well mashed (about 1 1/2 cups)</li>
          <li>1 teaspoon vanilla extract</li>
          <li>1/4 cup coconut oil barely warm - so it isn't solid (or alternately, olive oil)</li>
          <li>2 cups rolled oats</li>
          <li>2/3 cup almond meal</li>
          <li>1/3 cup coconut finely shredded & unsweetened</li>
          <li>1/2 teaspoon cinnamon</li>
          <li>1/2 teaspoon fine grain sea salt</li>
          <li>1 teaspoon baking powder</li>
          <li>6-7 ounces chocolate chips or dark chocolate bar chopped</li>
        </ul>`
      ,
      'preparation':
        `<ol>
          <li>In a large bowl combine the bananas, vanilla extract, and coconut oil.</li>
          <li>Set aside.</li>
          <li>In another bowl whisk together the oats, almond meal, shredded coconut, cinnamon, salt, and baking powder. </li>
          <li>Add the dry ingredients to the wet ingredients and stir until combined.</li>
          <li>Fold in the chocolate chunks/chips.</li>
          <li>The dough is a bit looser than a standard cookie dough, don't worry about it.</li>
          <li>Drop dollops of the dough, each about 2 teaspoons in size, an inch apart, onto a parchment (or Silpat) lined baking sheet.</li>
          <li>Bake for 12 - 14 minutes.</li>
          <li>I baked these as long as possible without burning the bottoms and they were perfect - just shy of 15 minutes seems to be about right in my oven.</li>
        </ol>`
    },
    'Zesty Slow Cooker Chicken Barbeque':{
      'ingredients':
        `<ul>
          <li>6 frozen skinless, boneless chicken breast halves</li>
          <li>1 (12 ounce) bottle barbeque sauce</li>
          <li>1/2 cup Italian salad dressing</li>
          <li>1/4 cup brown sugar</li>
          <li>2 tablespoons Worcestershire sauce</li>
        </ul>`
      ,
      'preparation':
        `<ol>
          <li>Place chicken in a slow cooker.</li>
          <li>In a bowl, mix the barbecue sauce, Italian salad dressing, brown sugar, and Worcestershire sauce.</li>
          <li>Pour over the chicken.</li>
          <li>Cover, and cook 3 to 4 hours on High or 6 to 8 hours on Low.</li>
        </ol>`
    }
  }



  mongoClient.connect(mongoUrl,(err,db)=>{
    if(err) throw err;
    var dbo = db.db('forkify');



    dbo.collection('content').insertOne({recipe},(err,res)=>{
      if(err) throw err;

    })


    })





app.post('/login',(req,res)=>{
  console.log("yes");
  mongoClient.connect(mongoUrl,(err,db)=>{
    if(err) throw err;
    var dbo = db.db('forkify');

    dbo.collection("users").findOne({username : req.body.userName,password:req.body.userPass},(err,r)=>{
      if(err) throw err;
          console.log(r.username);
     if(r==null){
      res.send({'token':'invalid'})

     }
     else{

        var token = new Date().getDate() + myKey;
        var token2 = crypto.SHA256(token).toString();
        console.log(token2)
        res.send({'token':token2});




     }

    })



    })

})

app.post('/signup',(req,res)=>{

  mongoClient.connect(mongoUrl,(err,db)=>{
    if(err) throw err;
    var dbo = db.db('forkify');
    //var userDetail = {firstname:req.body.firstName,lastname:req.body.lastName,username:req.body.userName,password:req.body.userPass};

    dbo.collection('users').findOne({username:req.body.userName},(err,al)=>{
      console.log(al);
      if(al == null){
        dbo.collection('users').insertOne({firstname:req.body.firstName,lastname:req.body.lastName,username:req.body.userName,password:req.body.userPass},(err,result)=>{
          res.send({'status':'loginNow'})
        })
        //res.send({'status':'loginNow'})
      }
      else{
        res.send({'status':'already'});
      }
    })





      // dbo.collection('users').insertOne({firstname:req.body.firstName,lastname:req.body.lastName,username:req.body.userName,password:req.body.userPass},(err,result)=>{

      // })



    })
})



app.post('/verifyToken',(req,res)=>{
  var todaysToken = crypto.SHA256( new Date().getDate()+myKey );

  if(req.body.token==todaysToken){
    res.send({'status':'valid'})
  }
  else{
    res.send({'status':'invalid'})
  }

})



app.post('/sendData',(req,res)=>{

  mongoClient.connect(mongoUrl,(err,db)=>{
    if(err) throw err;
    var dbo = db.db('forkify');

    dbo.collection('content').findOne({},(err,result)=>{

res.send(result.recipe[req.body.recipeName])

    })



    })


  //res.send(recipe[req.body.recipeName])
})


io.on('connection',(socket)=>{
console.log("connected")

});
//broadcasting
io.emit('newCustomer',"asdfjladsfhjas");

server.listen(5000,(req,res)=>{
  console.log("server is listening to port number 4000")
})
