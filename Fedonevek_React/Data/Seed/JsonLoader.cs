﻿using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Fedonevek_React.Data
{
    public static class JsonLoader
    {
        public static List<T> LoadJson<T>(string jsonName)
        {
            using (StreamReader r = new StreamReader($"{jsonName}.json"))
            {
                string json = r.ReadToEnd();
                return JsonConvert.DeserializeObject<List<T>>(json);
            }
        }
    }
}
