# 🍽️ Trojan Bites

**Trojan Bites** is a recipe recommendation web application tailored for USC students to submit, share, and vote on new dining hall recipes. With user authentication, recipe filtering, and voting capabilities, this platform empowers students to help shape their dining experience.

---

## 🔐 Authentication & Access

Users have three ways to interact with the application:

- **Create Account**  
  USC students can create an account using their `@usc.edu` email and a password. After validation, they gain access to all recipe submission and voting features.

- **Login**  
  Returning USC users can log in with their previously registered credentials to access the full functionality.

- **Continue as Guest**  
  Guest users can browse all submitted recipes, but cannot submit or upvote recipes. Attempting to do so will prompt login or account creation.

---

## 📝 Recipe Submission (USC Students Only)

Authenticated students can submit new recipe suggestions for the dining halls:

- Fill out a form including:
  - List of ingredients and their amounts
  - Step-by-step preparation instructions
  - Dietary tags (e.g., Vegan, Halal, Gluten-Free)
- Submitted recipes are automatically added to the display page and visible to all users.

---

## 🍴 Recipe Display & Interaction

All users can view submitted recipes. Features include:

- **Filtering & Sorting:**
  - Sort by popularity (default), recent submissions, or categories.
- **Voting:**
  - Logged-in students can upvote their favorite recipes.
  - Vote counts are displayed to highlight popular dishes.
- **Guest Limitations:**
  - Guests can view all content but must log in or sign up to interact (vote/submit).

---

## 🚀 Tech Stack

- **Frontend:** HTML, CSS, JavaScript (with AJAX)
- **Backend:** Java Servlets
- **Database:** MySQL
- **Authentication:** Email validation for `@usc.edu` domains

---

## 🛠️ Setup Instructions

1. Clone this repository:

   ```bash
   git clone https://github.com/yourusername/trojan-bites.git
   cd trojan-bites

   ```

2. Running the application:

Frontend:

```
cd frontend
npm run dev
```

Backend:

```
cd backend
./mvnw spring-boot:run
```

Note: you have to run both frontend and backend simultaneously
