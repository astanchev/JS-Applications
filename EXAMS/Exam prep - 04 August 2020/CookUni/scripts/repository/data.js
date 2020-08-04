const url = `https://api.backendless.com/CB1C65F4-7865-C715-FF88-6531592D9800/B56265EE-104C-449D-8E34-4FB7A2E71952/`;

const endpoints = {
    register: 'users/register',
    login: 'users/login',
    logout: 'users/logout',
    user: 'data/Users',
    recipe: 'data/Recipe'
};

export async function register(user) {
    return (await fetch(url + endpoints.register, {
        method: 'post',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(user)
    })).json();
}

export async function login(user) {
    return (await fetch(url + endpoints.login, {
        method: 'post',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(user)
    })).json();
}

export async function logout(token) {
    return await fetch(url + endpoints.logout, {
        method: 'get',
        headers: {
            'user-token': token
        }
    });
}

export async function createRecipe(token, recipe) {
    return await (await fetch(url + endpoints.recipe, {
        method: 'post',
        headers: {
            'Content-type': 'application/json',
            'user-token': token
        },
        body: JSON.stringify(recipe)
    })).json();
}

export async function getAllRecipes(token) {

    return (await fetch(url + endpoints.recipe, {
        headers: {
            'user-token': token
        }
    })).json();
}

export async function getRecipeById(token, recipeId) {
    const urlRecipe = url + endpoints.recipe + `/${recipeId}`;

    return await (await fetch(urlRecipe, {
        method: 'get',
        headers: {
            'user-token': token
        }
    })).json();
}

export async function editRecipe(token, recipeId, recipe) {
    const recipeURL = url + endpoints.recipe + `/${recipeId}`;

    return await (await fetch(recipeURL, {
        method: 'put',
        headers: {
            'Content-type': 'application/json',
            'user-token': token
        },
        body: JSON.stringify(recipe)
    })).json();
}

export async function deleteRecipe(token, recipeId) {
    const recipeURL = url + endpoints.recipe + `/${recipeId}`;

    return (await fetch(recipeURL, {
        method: 'delete',
        headers: {
            'user-token': token
        }
    })).json();
}

export async function likeRecipe(token, recipeId) {
    const recipeURL = url + endpoints.recipe + `/${recipeId}`;

    const recipe = await (await fetch(recipeURL, {
        method: 'get',
        headers: {
            'user-token': token
        }
    })).json();

    if (recipe.ownerId === localStorage.userId) {
        throw new Error('You can not like your recipe!');
    }

    return await (await fetch(recipeURL, {
        method: 'put',
        headers: {
            'Content-type': 'application/json',
            'user-token': token
        },
        body: JSON.stringify({
            likes: Number(recipe.likes) + 1
        })
    })).json();
}
