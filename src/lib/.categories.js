const categories = {
    Kühlregal: ["milch", "butter", "sahne", "joghurt", "brei", "schmand", "schlagsahne", "käse", "quark", "pudding",
    "milk", "butter", "cream", "yogurt", "sour", "whipped cream", "cheese", "quark", "pudding"],

    Fleisch: ["fleisch", "fisch", "wurst", "hähnchen", "geflügel", "schinken", "lyoner", "salami", "pizzafleischkäse", "bierschinken", "currywurst", "bratwurst", "leberwurst", "landjäger", "weißwürste", "saitenwürste",
    "meat", "chicken", "poultry", "fish", "sausage", "ham"],

    Gefriertruhe: ["pommes", "kroketten", "eis", "gefrorenes", "frosta", "pizza",
    "fries", "croquettes", "ice cream", "frozen", "pizza"],

    Obst: ["obst", "früchte", "äpfel", "kirschen", "melone", "birne", "banane", "orange", "aprikose", "beeren", "kiwis", "avocado", "ananas", "pfirsich", "trauben", "rosinen", "granatapfel", "granatäpfel", "zitrone", "limette", "mango", "litschi", "kokosnuss", "mandarine", 
    "fruit", "apple", "cherries", "melon", "pear", "banana", "orange", "apricot", "berries", "currants", "kiwis", "avocado", "pineapple", "peach", "grapes", "raisins", "pomegranate", "lemon", "lime", "mango", "lychee", "coconut", "tangerine"],

    Gemüse: ["paprika", "zwiebel", "kartoffel", "gurke", "salat", "karotten", "erbsen", "bohnen", "brokkoli", "blumenkohl", "fenchel", "kohl", "möhren", "knoblauch", "kichererbsen", "pilze", "kohlrabi", "oliven", "kürbis", "auberginen", "radieschen", "rhabarber", "rosenkohl", "sellerie", "spinat", "spargel", "tomaten", "zucchini", "lauch", "spargel", 
    "pepper", "onion", "potato", "cucumber", "lettuce", "carrot", "peas", "beans", "broccoli", "cauliflower", "fennel", "cabbage", "garlic", "chickpea", "mushroom", "kohlrabi", "olives", "pumpkin", "aubergine", "radishes", "rhubarb", "brussel sprout", "celery", "spinach", "asparagus", "zucchini", "leeks", "asparagus"],

    Vorrat: ["brot", "brötchen", "wecken", "gebäck", "laugenstangen", "toast", "brezeln", "backpulver", "vanillinzucker", "kuchen", "empolvados", "croissant", "apfeltaschen", "käsestangen", "weihnachtsgebäck", "salz", "pfeffer", "petersilie", "basilikum", "zimt", "chilipulver", "paprikapulver", "maggi", "muskatnuss", "koriander", "ankerkraut", "curry", "fenchel", "ingwer", "knoblauch", "kümmel", "lorbeer", "minze", "oregano", "rosmarin", "salbei", "schnittlauch", "wacholderbeeren", "olivenöl", "marmelade", "nutella", "honig", "soße", "bratensoße", "ketchup", "rindersoße", "rahmsoße", "bechamelsoße", "hollandaise", "tomatensoße", "mayonnaise", "ravioli", "dosenwurst", "bohnen", "tütensuppen", "tütensuppe", "erbsen", "getrocknete tomaten", "sardinen", "nudeln", "spaghetti", "makkaroni", "fusilli", "penne", "rigatoni", "gnocchi", "tortellini", 
    "bread", "buns", "wakening", "pastry", "pretzel sticks", "toast", "pretzels", "baking powder", "vanillin sugar", "cake", "empolvados", "croissant" , "cheese sticks", "Christmas biscuits", "salt", "pepper", "parsley", "basil", "cinnamon", "chili powder", "paprika powder", "maggi", "nutmeg", " coriander", "anchor herb", "curry", "fennel", "ginger", "garlic", "cumin", "laurel", "mint", "oregano", "rosemary", "sage", "chives" , "juniper berries", "olive oil", "jam", "nutella", "honey", "sauce", "gravy", "ketchup", "beef sauce", "bechamel sauce", "hollandaise", " tomato sauce", "mayonnaise", "ravioli", "canned sausage", "packaged soup", "packaged soup", "peas", "dried tomatoes", "sardines", "noodles", "spaghetti", "macaroni ", "fusilli", "penne", "rigatoni", "gnocchi", "tortellini"],

    Getränke: ["bier", "wasser", "saft", "orangensaft", "alkohol", "kinderpunsch", "glühwein", "sprudel", "spezi", "fanta", "cola", "capri sonne", "energy drink", "traubensaft", "redbull", "durstlöscher", "sprite", "wein", "wodka", "rotwein", "weißwein", "roséwein", "schnaps", "gin tonic", 
    "beer", "water", "juice", "orange juice", "alcohol", "kids' punch", "special", "fanta", "coke", "energy drink", "grape juice", "redbull", "thirst quencher", "sprite", "wine", "vodka", "schnapps", "gin tonic"],

    Haushalt: ["waschmittel", "spülmittel", "zahnpasta", "duschgel", "zahnbürste", "zahnbürsten", "handseife", "seife", "lappen", "deo", "gel", "wachs", "rasierer", "kamm", "duschseife", "handtuch", "handtücher", "parfüm", "salbe", "creme", "stifte", "stift", "füller", "patronen", "ordner", "schnellhefter", "tintenkiller", "schere", "kleber", "flüssigkleber", "ordner", "bleistift", "lineal", "geodreieck", "spitzler", "block", "computer", "handy", "iphone", "maus", "tastatur", "monitor", "led kette", "kamera", "mikrofon", "mikro", "headset", "lampe", "telefon", "ladegerät",
    "detergent", "dishwashing liquid", "toothpaste", "shower gel", "toothbrush", "soap", "rag", "deodorant", "gel", "wax" , "razor", "comb", "towel", "perfume", "ointment", "pen", "cartridges", " folder", "fast stapler", "inkkiller", "scissors", "glue", "liquid glue", "folder", "pencil", "ruler", "set triangle", "spitzler", "pad", "computer" , "mobile phone", "iphone", "mouse", "keyboard", "monitor", "led chain", "camera", "microphone", "micro", "headset", "lamp", "phone", "charger"],

    Süßigkeiten: ["nimm2", "haribo", "gummibärchen", "schokolade", "twixx", "smarties", "mars", "chips", "m&m's", "snickers", "toblerone", "donuts", "kinder schokolade", "giotto", "lollis", "duplo", "oreo", "trolliwürmer", "kaugummis", "ritter sport schokolade", "ahoi brause", "esspapier", "rittersport schokolade",
    "haribo", "gummy bears", "chocolate", "twixx", "smarties", "mars", "chips", "m&m's", "snickers", "toblerone", "donuts", "giotto", "lollipops", "duplo", "oreo", "chewing gum", "ahoi fizzy", "edible paper"],
}